import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Database, 
  Shield, 
  Zap, 
  CheckCircle2, 
  Loader2,
  Eye,
  Lock,
  Wifi,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mandate: {
    id: number;
    title: string;
    reward: number;
    matchingRecords: number;
    criteria: string;
  };
}

const contributionSteps = [
  { id: 1, title: 'Secure Handshake', description: 'Connecting to your local Chintu Node...', icon: Wifi },
  { id: 2, title: 'Private Data Scan', description: 'Scanning local records for matches...', icon: Database },
  { id: 3, title: 'Local Computation', description: 'Computing privacy-preserving model update...', icon: Zap },
  { id: 4, title: 'ZK Proof Generation', description: 'Generating Zero-Knowledge proof...', icon: Shield },
  { id: 5, title: 'On-Chain Verification', description: 'Submitting proof to Midnight network...', icon: CheckCircle2 },
  { id: 6, title: 'Success & Reward', description: 'Contribution verified and reward distributed', icon: Award }
];

export default function ContributionModal({ isOpen, onClose, mandate }: ContributionModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [computedData, setComputedData] = useState({
    recordsFound: 0,
    averageAge: 0,
    diagnosisFrequency: {} as Record<string, number>
  });

  const startContribution = () => {
    setIsProcessing(true);
    setCurrentStep(1);
    setProgress(0);

    // Simulate the contribution process
    const stepDuration = 3000; // 3 seconds per step
    const totalSteps = contributionSteps.length;

    contributionSteps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1);
        setProgress(((index + 1) / totalSteps) * 100);
        
        // Simulate data computation on step 2
        if (index === 1) {
          setComputedData({
            recordsFound: mandate.matchingRecords,
            averageAge: 45.3,
            diagnosisFrequency: {
              'Diabetes': 23.4,
              'Hypertension': 31.2,
              'Heart Disease': 18.7,
              'Other': 26.7
            }
          });
        }
        
        // Complete the process
        if (index === totalSteps - 1) {
          setTimeout(() => {
            setIsProcessing(false);
          }, 2000);
        }
      }, (index + 1) * stepDuration);
    });
  };

  const resetModal = () => {
    setCurrentStep(0);
    setIsProcessing(false);
    setProgress(0);
    setComputedData({ recordsFound: 0, averageAge: 0, diagnosisFrequency: {} });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="neural-card w-full max-w-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-display font-bold text-primary">Secure Contribution</h2>
              <p className="text-sm text-muted-foreground font-body">{mandate.title}</p>
            </div>
            <Button variant="ghost" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {!isProcessing && currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="neural-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-body font-semibold text-lg mb-2">{mandate.title}</h3>
                        <p className="text-sm text-muted-foreground font-body mb-4">{mandate.criteria}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground font-body">Matching Records</p>
                            <p className="font-display font-semibold text-success">
                              {mandate.matchingRecords.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground font-body">Reward</p>
                            <p className="font-display font-semibold text-primary">
                              {mandate.reward} tDUST
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-display font-semibold text-primary mb-2">Privacy Guarantee</h4>
                      <p className="font-body text-sm text-foreground">
                        Your data never leaves your secure environment. We'll compute a privacy-preserving 
                        model update and generate a Zero-Knowledge proof of its validity without revealing 
                        any of your {mandate.matchingRecords.toLocaleString()} matching records.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button onClick={startContribution} className="btn-neural font-body px-8">
                    <Shield className="w-5 h-5 mr-2" />
                    Start Secure Contribution
                  </Button>
                </div>
              </motion.div>
            )}

            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-sm text-muted-foreground">
                      Step {currentStep} of {contributionSteps.length}
                    </span>
                    <span className="font-display font-semibold text-primary">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Current Step */}
                <Card className="neural-card">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                       <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                         {currentStep <= contributionSteps.length && (
                           <>
                             {currentStep === contributionSteps.length ? (
                               React.createElement(contributionSteps[currentStep - 1].icon, { className: "w-6 h-6 text-primary" })
                             ) : (
                               <Loader2 className="w-6 h-6 text-primary animate-spin" />
                             )}
                           </>
                         )}
                       </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-lg">
                          {contributionSteps[currentStep - 1]?.title}
                        </h3>
                        <p className="font-body text-muted-foreground">
                          {contributionSteps[currentStep - 1]?.description}
                        </p>
                      </div>
                    </div>

                    {/* Show computed data during local computation step */}
                    {currentStep === 3 && computedData.recordsFound > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-secondary/20 rounded-lg"
                      >
                        <p className="font-body text-sm text-muted-foreground mb-2">
                          Computing aggregated statistics from {computedData.recordsFound.toLocaleString()} records:
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-body text-muted-foreground">Average Age:</span>
                            <span className="font-display font-semibold text-primary ml-2">
                              {computedData.averageAge} years
                            </span>
                          </div>
                          <div>
                            <span className="font-body text-muted-foreground">Records Processed:</span>
                            <span className="font-display font-semibold text-success ml-2">
                              {computedData.recordsFound.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ZK Proof Visualization */}
                    {currentStep === 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4"
                      >
                        <div className="grid grid-cols-3 gap-2">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0.8, opacity: 0.3 }}
                              animate={{ 
                                scale: [0.8, 1.2, 1], 
                                opacity: [0.3, 1, 0.8],
                                backgroundColor: ['hsl(180 100% 50% / 0.1)', 'hsl(180 100% 50% / 0.3)', 'hsl(180 100% 50% / 0.1)']
                              }}
                              transition={{ 
                                delay: i * 0.2,
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 2
                              }}
                              className="w-full h-8 rounded bg-primary/10 border border-primary/20"
                            />
                          ))}
                        </div>
                        <p className="font-body text-xs text-center text-muted-foreground mt-3">
                          Generating mathematical proof of contribution validity...
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                {/* Success State */}
                {currentStep === 6 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-success" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-success mb-2">Success!</h3>
                    <p className="font-body text-muted-foreground mb-4">
                      Your contribution has been verified and aggregated.
                    </p>
                    <p className="font-display font-semibold text-primary text-lg mb-4">
                      +{mandate.reward} tDUST has been transferred to your wallet.
                    </p>
                    <Badge className="font-body">
                      Transaction: 0x4f2a...8b9c
                    </Badge>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Complete but not processing */}
            {!isProcessing && currentStep === 6 && (
              <div className="text-center">
                <Button onClick={handleClose} className="btn-neural font-body">
                  Close
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}