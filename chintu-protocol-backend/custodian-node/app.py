import pandas as pd
from flask import Flask, jsonify, request
from sklearn.linear_model import SGDClassifier
import numpy as np
import hashlib
import subprocess
import json
import os

# --- 1. Basic Flask App Setup ---
app = Flask(__name__)

# --- 2. Machine Learning Core (REAL, NOT MOCKED) ---
# In a real app, this would be loaded from a central registry (like our contract)
# For the hackathon, we initialize a fresh model each time.
model = SGDClassifier(loss="log_loss", penalty="l2", max_iter=1000, warm_start=True)
# Initialize model weights with a single sample to make it ready for partial_fit
model.fit(np.array([[0, 0, 0]]), np.array([0])) 
initial_weights = model.coef_.copy()

def train_model_on_private_data():
    """
    This function simulates a full federated learning cycle on the custodian's
    private data. It's the heart of our off-chain computation.
    """
    print("--- Starting Local ML Training Cycle ---")
    
    # a. Load our private medical data
    try:
        df = pd.read_csv("data/hospital_patients.csv")
        print(f"Loaded {len(df)} total patient records.")
    except FileNotFoundError:
        print("ERROR: hospital_patients.csv not found!")
        return None, None, None

    # b. Filter data based on a mandate's criteria (hardcoded for now)
    # This simulates receiving a job from the Chintu contract.
    filtered_df = df[df['age'] >= 18]
    print(f"Found {len(filtered_df)} records matching criteria (age >= 18).")
    
    if len(filtered_df) < 2: # Need at least 2 samples to train
        print("Not enough matching data to train on.")
        return None, None, None

    features = filtered_df[['age', 'bmi', 'blood_glucose_level']]
    labels = filtered_df['has_diabetes']

    # c. Perform one epoch of REAL training
    print("Performing one epoch of local training...")
    weights_before = model.coef_.copy()
    model.partial_fit(features, labels, classes=np.array([0, 1]))
    weights_after = model.coef_.copy()
    print("Local training complete.")

    # d. Calculate the gradient (the "model improvement")
    gradient = weights_after - weights_before
    print(f"Calculated gradient: {gradient}")
    
    # e. Create a commitment to the data used for the proof
    # This proves we used this specific data batch.
    data_batch_string = filtered_df.to_string().encode('utf-8')
    data_commitment = hashlib.sha256(data_batch_string).hexdigest()
    print(f"Data Commitment Hash: {data_commitment}")

    return gradient, data_commitment, filtered_df.to_dict('records')

# --- 3. Midnight Network Interaction ---
# We will use a simple Node.js wrapper to handle the complexities
# of the Midnight SDK, as it's currently JavaScript/TypeScript-based.

def generate_zk_proof(private_data_batch, data_commitment):
    """
    Calls a Node.js script to generate the ZK proof using Midnight.js.
    """
    print("\n--- Generating ZK Proof via Node.js Wrapper ---")
    
    # This Node.js script needs to be created next
    wrapper_script = "midnight_proof_wrapper.js" 
    
    if not os.path.exists(wrapper_script):
        print(f"ERROR: The wrapper script '{wrapper_script}' does not exist.")
        return None

    # We pass data to the script via stdin
    payload = {
        "privateDataBatch": private_data_batch,
        "dataCommitment": "0x" + data_commitment,
        # In a real app, these would come from the user's secure storage
        "custodianSecret": "0x" + "a" * 64, 
        "mandateId": 0 # Using 0 for the first mandate
    }
    
    try:
        process = subprocess.run(
            ['node', wrapper_script],
            input=json.dumps(payload),
            text=True,
            capture_output=True,
            check=True
        )
        print("Node.js wrapper executed successfully.")
        proof_result = json.loads(process.stdout)
        print(f"Successfully received proof. TX Hash: {proof_result.get('txHash')}")
        return proof_result
    except subprocess.CalledProcessError as e:
        print("ERROR: Node.js wrapper failed.")
        print("Stdout:", e.stdout)
        print("Stderr:", e.stderr)
        return None
    except json.JSONDecodeError as e:
        print(f"ERROR: Could not decode JSON from Node.js wrapper stdout: {e}")
        return None

# --- 4. Flask API Endpoint ---
@app.route('/run-training-cycle', methods=['POST'])
def run_training_cycle():
    """
    This endpoint triggers one full cycle of training and proof generation.
    """
    gradient, data_commitment, private_data_batch = train_model_on_private_data()
    
    if gradient is None:
        return jsonify({"error": "ML training failed."}), 500
        
    proof_result = generate_zk_proof(private_data_batch, data_commitment)
    
    if proof_result is None:
        return jsonify({"error": "Proof generation failed."}), 500

    return jsonify({
        "status": "success",
        "message": "Training cycle complete and proof submitted.",
        "gradient": gradient.tolist(),
        "dataCommitment": data_commitment,
        "transactionDetails": proof_result
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)