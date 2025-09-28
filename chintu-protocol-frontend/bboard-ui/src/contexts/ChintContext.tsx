// This file is part of Chintu LLM Benchmarking System.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import React, { type PropsWithChildren, createContext, useState, useCallback } from 'react';
import { type Logger } from 'pino';
import { BrowserDeployedBoardManager, type DeployedBoardAPIProvider } from './BrowserDeployedBoardManager';

/**
 * Model configuration interface
 */
export interface ModelConfig {
  baseUrl: string;
  modelName: string;
  apiKey: string;
}

/**
 * Benchmark progress interface
 */
export interface BenchmarkProgress {
  currentQuestion: number;
  totalQuestions: number;
  isRunning: boolean;
  isComplete: boolean;
}

/**
 * Leaderboard entry interface
 */
export interface LeaderboardEntry {
  name: string;
  score: number;
  rank?: number;
}

/**
 * Chintu workflow state interface
 */
export interface ChintState {
  currentStep: number;
  walletConnected: boolean;
  modelConfig: ModelConfig | null;
  attestationCommand: string;
  benchmarkProgress: BenchmarkProgress;
  verificationComplete: boolean;
  finalScore: number | null;
  leaderboard: LeaderboardEntry[];
  isProcessing: boolean;
  errorMessage: string | null;
}

/**
 * Chintu context interface
 */
export interface ChintContextType extends ChintState {
  // Navigation
  nextStep: () => void;
  setStep: (step: number) => void;
  
  // Wallet operations
  connectWallet: () => Promise<void>;
  
  // Model configuration
  setModelConfig: (config: ModelConfig) => Promise<void>;
  
  // TEE attestation
  setAttestationCommand: (command: string) => Promise<void>;
  
  // Benchmark operations
  startBenchmark: () => Promise<void>;
  
  // Verification
  verifyResults: () => Promise<void>;
  
  // Mock signing helper
  triggerMockSigning: (message: string) => Promise<void>;
  
  // Error handling
  clearError: () => void;
  setError: (message: string) => void;
}

const initialState: ChintState = {
  currentStep: 0,
  walletConnected: false,
  modelConfig: null,
  attestationCommand: '',
  benchmarkProgress: {
    currentQuestion: 0,
    totalQuestions: 10,
    isRunning: false,
    isComplete: false,
  },
  verificationComplete: false,
  finalScore: null,
  leaderboard: [
    { name: 'GPT-OSS 120B', score: 95, rank: 1 },
    { name: 'Qwen2', score: 88, rank: 2 },
    { name: 'Gemma 3 27B', score: 82, rank: 3 },
  ],
  isProcessing: false,
  errorMessage: null,
};

/**
 * Encapsulates Chintu workflow state as a context object.
 */
export const ChintContext = createContext<ChintContextType | undefined>(undefined);

/**
 * The props required by the {@link ChintProvider} component.
 */
export type ChintProviderProps = PropsWithChildren<{
  /** The `pino` logger to use. */
  logger: Logger;
}>;

/**
 * A React component that provides Chintu workflow state management.
 */
export const ChintProvider: React.FC<Readonly<ChintProviderProps>> = ({ logger, children }) => {
  const [state, setState] = useState<ChintState>(initialState);
  
  // Keep the existing board manager for signing operations
  const [boardManager] = useState(() => new BrowserDeployedBoardManager(logger));

  const updateState = useCallback((updates: Partial<ChintState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const triggerMockSigning = useCallback(async (message: string) => {
    logger.info(`Mock signing: ${message}`);
    updateState({ isProcessing: true });
    
    try {
      // Use the existing board deployment system to trigger wallet signing
      const deployment = boardManager.resolve();
      // Wait a bit to simulate signing process
      await new Promise(resolve => setTimeout(resolve, 2000));
      logger.info(`Mock signing completed: ${message}`);
    } catch (error) {
      logger.error(`Mock signing failed: ${error}`);
      updateState({ errorMessage: error instanceof Error ? error.message : 'Signing failed' });
    } finally {
      updateState({ isProcessing: false });
    }
  }, [boardManager, logger, updateState]);

  const nextStep = useCallback(() => {
    setState(prev => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 5) }));
  }, []);

  const setStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, currentStep: Math.max(0, Math.min(step, 5)) }));
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      updateState({ isProcessing: true, errorMessage: null });
      await triggerMockSigning('Connect to Midnight Lace Wallet');
      updateState({ walletConnected: true });
      nextStep();
    } catch (error) {
      updateState({ errorMessage: 'Failed to connect wallet' });
    }
  }, [triggerMockSigning, nextStep, updateState]);

  const setModelConfig = useCallback(async (config: ModelConfig) => {
    try {
      updateState({ isProcessing: true, errorMessage: null });
      await triggerMockSigning('Sign to register model configuration');
      updateState({ modelConfig: config });
      nextStep();
    } catch (error) {
      updateState({ errorMessage: 'Failed to configure model' });
    }
  }, [triggerMockSigning, nextStep, updateState]);

  const setAttestationCommand = useCallback(async (command: string) => {
    try {
      updateState({ isProcessing: true, errorMessage: null });
      await triggerMockSigning('Sign to submit TEE attestation hash');
      updateState({ attestationCommand: command });
      nextStep();
    } catch (error) {
      updateState({ errorMessage: 'Failed to submit attestation' });
    }
  }, [triggerMockSigning, nextStep, updateState]);

  const startBenchmark = useCallback(async () => {
    try {
      updateState({ isProcessing: true, errorMessage: null });
      await triggerMockSigning('Sign to start benchmark process');
      
      updateState({ 
        benchmarkProgress: { 
          ...state.benchmarkProgress, 
          isRunning: true 
        } 
      });

      // Simulate 10 questions with delays
      for (let i = 0; i < 10; i++) {
        updateState({ 
          benchmarkProgress: { 
            currentQuestion: i + 1,
            totalQuestions: 10,
            isRunning: true,
            isComplete: false,
          } 
        });
        
        // Mock processing delay (30-40 seconds compressed to 3-4 seconds for demo)
        await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 1000));
        
        // Mock signing for each question
        await triggerMockSigning(`Sign to submit answer ${i + 1}/10`);
      }

      // Final signing to publish results
      await triggerMockSigning('Sign to publish benchmark results on-chain');
      
      updateState({ 
        benchmarkProgress: { 
          currentQuestion: 10,
          totalQuestions: 10,
          isRunning: false,
          isComplete: true,
        } 
      });
      
      nextStep();
    } catch (error) {
      updateState({ 
        errorMessage: 'Benchmark failed',
        benchmarkProgress: { 
          ...state.benchmarkProgress, 
          isRunning: false 
        }
      });
    }
  }, [triggerMockSigning, nextStep, updateState, state.benchmarkProgress]);

  const verifyResults = useCallback(async () => {
    try {
      updateState({ isProcessing: true, errorMessage: null });
      
      // Mock verification process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      await triggerMockSigning('Sign to verify benchmark integrity');
      
      // Generate random score between 75-90
      const score = 75 + Math.floor(Math.random() * 15);
      
      // Insert into leaderboard
      const newLeaderboard = [...state.leaderboard, { name: state.modelConfig?.modelName || 'Unknown Model', score }]
        .sort((a, b) => b.score - a.score)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));
      
      updateState({ 
        verificationComplete: true, 
        finalScore: score,
        leaderboard: newLeaderboard
      });
      
      nextStep();
    } catch (error) {
      updateState({ errorMessage: 'Verification failed' });
    }
  }, [triggerMockSigning, nextStep, updateState, state.leaderboard, state.modelConfig]);

  const clearError = useCallback(() => {
    updateState({ errorMessage: null });
  }, [updateState]);

  const setError = useCallback((message: string) => {
    updateState({ errorMessage: message });
  }, [updateState]);

  const contextValue: ChintContextType = {
    ...state,
    nextStep,
    setStep,
    connectWallet,
    setModelConfig,
    setAttestationCommand,
    startBenchmark,
    verifyResults,
    triggerMockSigning,
    clearError,
    setError,
  };

  return (
    <ChintContext.Provider value={contextValue}>
      {children}
    </ChintContext.Provider>
  );
};