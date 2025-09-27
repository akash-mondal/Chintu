import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Mandate = { creator: Uint8Array;
                        rewardPerUpdate: bigint;
                        modelCommitment: Uint8Array;
                        criteriaCommitment: Uint8Array
                      };

export type Witnesses<T> = {
  get_custodian_secret(context: __compactRuntime.WitnessContext<Ledger, T>): [T, Uint8Array];
  get_merkle_path(context: __compactRuntime.WitnessContext<Ledger, T>,
                  commitment_0: Uint8Array): [T, { leaf: Uint8Array,
                                                   path: { sibling: { field: bigint
                                                                    },
                                                           goes_left: boolean
                                                         }[]
                                                 }];
  get_private_medical_batch(context: __compactRuntime.WitnessContext<Ledger, T>): [T, { age: bigint,
                                                                                        diagnosisCode: bigint
                                                                                      }[]];
}

export type ImpureCircuits<T> = {
  register_custodian(context: __compactRuntime.CircuitContext<T>,
                     commitment_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  create_mandate(context: __compactRuntime.CircuitContext<T>,
                 creator_0: Uint8Array,
                 reward_0: bigint,
                 modelCommitment_0: Uint8Array,
                 criteriaCommitment_0: Uint8Array): __compactRuntime.CircuitResults<T, bigint>;
  submit_medical_update(context: __compactRuntime.CircuitContext<T>,
                        mandateId_0: bigint,
                        dataCommitment_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
}

export type Circuits<T> = {
  register_custodian(context: __compactRuntime.CircuitContext<T>,
                     commitment_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  create_mandate(context: __compactRuntime.CircuitContext<T>,
                 creator_0: Uint8Array,
                 reward_0: bigint,
                 modelCommitment_0: Uint8Array,
                 criteriaCommitment_0: Uint8Array): __compactRuntime.CircuitResults<T, bigint>;
  submit_medical_update(context: __compactRuntime.CircuitContext<T>,
                        mandateId_0: bigint,
                        dataCommitment_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
}

export type Ledger = {
  custodians: {
    isFull(): boolean;
    checkRoot(rt_0: { field: bigint }): boolean;
    root(): __compactRuntime.MerkleTreeDigest;
    firstFree(): bigint;
    pathForLeaf(index_0: bigint, leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array>;
    findPathForLeaf(leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array> | undefined;
    history(): Iterator<__compactRuntime.MerkleTreeDigest>
  };
  mandates: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): Mandate;
    [Symbol.iterator](): Iterator<[bigint, Mandate]>
  };
  readonly mandateSequence: bigint;
  submittedUpdates: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
