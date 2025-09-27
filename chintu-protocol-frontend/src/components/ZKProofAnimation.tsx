import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';

interface ProofNode {
  id: number;
  x: number;
  y: number;
  verified: boolean;
  connecting: boolean;
}

export default function ZKProofAnimation() {
  const [nodes, setNodes] = useState<ProofNode[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [proofStep, setProofStep] = useState(0);

  useEffect(() => {
    // Initialize proof nodes
    const initialNodes: ProofNode[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 20 + (i % 6) * 12,
      y: 20 + Math.floor(i / 6) * 25,
      verified: false,
      connecting: false
    }));
    setNodes(initialNodes);

    // Start proof generation cycle
    const proofCycle = setInterval(() => {
      setIsGenerating(true);
      setProofStep(0);

      // Animate proof generation
      const steps = [
        () => setProofStep(1), // Data preparation
        () => setProofStep(2), // Commitment phase
        () => setProofStep(3), // Challenge phase
        () => setProofStep(4), // Response phase
        () => {
          setProofStep(5); // Verification
          setIsGenerating(false);
        }
      ];

      steps.forEach((step, index) => {
        setTimeout(step, (index + 1) * 1500);
      });

      // Animate nodes
      setTimeout(() => {
        setNodes(prev => prev.map((node, i) => ({
          ...node,
          connecting: true,
          verified: false
        })));
      }, 1000);

      setTimeout(() => {
        setNodes(prev => prev.map(node => ({
          ...node,
          verified: true,
          connecting: false
        })));
      }, 5000);

      setTimeout(() => {
        setNodes(prev => prev.map(node => ({
          ...node,
          verified: false,
          connecting: false
        })));
      }, 7000);

    }, 10000);

    return () => clearInterval(proofCycle);
  }, []);

  const proofSteps = [
    { name: 'Idle', description: 'Monitoring data privacy', icon: Shield },
    { name: 'Prepare', description: 'Preparing private data', icon: Lock },
    { name: 'Commit', description: 'Creating cryptographic commitment', icon: EyeOff },
    { name: 'Challenge', description: 'Generating random challenge', icon: Eye },
    { name: 'Response', description: 'Computing zero-knowledge response', icon: Lock },
    { name: 'Verified', description: 'Proof verified successfully', icon: Shield }
  ];

  const currentStepInfo = proofSteps[proofStep];

  return (
    <div className="relative w-full h-48 bg-gradient-to-br from-background to-secondary/20 rounded-lg border border-border overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="zkgrid" width="15" height="15" patternUnits="userSpaceOnUse">
              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#zkgrid)" />
        </svg>
      </div>

      {/* Proof Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{
            backgroundColor: node.verified 
              ? 'hsl(var(--success))' 
              : node.connecting 
                ? 'hsl(var(--primary))' 
                : 'hsl(var(--muted-foreground))',
            scale: node.connecting ? [1, 1.5, 1] : 1,
            boxShadow: node.verified 
              ? '0 0 10px hsl(var(--success))' 
              : node.connecting 
                ? '0 0 8px hsl(var(--primary))' 
                : '0 0 4px hsl(var(--muted-foreground))'
          }}
          transition={{ duration: 0.5, repeat: node.connecting ? Infinity : 0 }}
        />
      ))}

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, index) => {
          if (index === nodes.length - 1) return null;
          const nextNode = nodes[index + 1];
          
          return (
            <motion.line
              key={`line-${index}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nextNode.x}%`}
              y2={`${nextNode.y}%`}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              opacity={node.connecting || node.verified ? 0.6 : 0.2}
              strokeDasharray="2 3"
              animate={{
                pathLength: node.connecting ? [0, 1] : node.verified ? 1 : 0,
                opacity: node.connecting || node.verified ? 0.6 : 0.2
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          );
        })}
      </svg>

      {/* Central ZK Symbol */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-primary/50 flex items-center justify-center"
          animate={{
            borderColor: proofStep > 0 ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.5)',
            backgroundColor: proofStep === 5 ? 'hsl(var(--success) / 0.2)' : 'hsl(var(--background) / 0.8)',
            scale: isGenerating ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 0.5, repeat: isGenerating ? Infinity : 0 }}
        >
          <currentStepInfo.icon 
            className={`w-6 h-6 ${
              proofStep === 5 ? 'text-success' : 
              proofStep > 0 ? 'text-primary' : 
              'text-muted-foreground'
            }`} 
          />
        </motion.div>
      </div>

      {/* Status Information */}
      <div className="absolute bottom-2 left-2 right-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-sm font-semibold text-primary">
              {currentStepInfo.name}
            </div>
            <div className="font-body text-xs text-muted-foreground">
              {currentStepInfo.description}
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex space-x-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-1 rounded-full transition-colors ${
                  i <= proofStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Proof Particles */}
      {isGenerating && (
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%',
                opacity: 0 
              }}
              animate={{
                x: [
                  Math.random() * 100 + '%',
                  '50%',
                  Math.random() * 100 + '%'
                ],
                y: [
                  Math.random() * 100 + '%',
                  '50%',
                  Math.random() * 100 + '%'
                ],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}