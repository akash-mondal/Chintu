// This file is part of Chintu LLM Benchmarking System.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Box, Container, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { MainLayout } from './components/Layout';
import { 
  WalletConnect, 
  ModelConfig, 
  AttestationConfig, 
  BenchmarkRunner, 
  ResultVerification, 
  Leaderboard 
} from './components';
import { useChintContext } from './hooks';

const steps = [
  'Connect Wallet',
  'Configure Model',
  'TEE Attestation', 
  'Run Benchmark',
  'Verify Results',
  'Leaderboard'
];

/**
 * The root Chintu LLM benchmarking application component.
 *
 * @remarks
 * The {@link App} component manages the 6-step workflow for LLM benchmarking
 * using zero-knowledge proofs and TEE attestation.
 */
const App: React.FC = () => {
  const { currentStep } = useChintContext();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <WalletConnect />;
      case 1:
        return <ModelConfig />;
      case 2:
        return <AttestationConfig />;
      case 3:
        return <BenchmarkRunner />;
      case 4:
        return <ResultVerification />;
      case 5:
        return <Leaderboard />;
      default:
        return <WalletConnect />;
    }
  };

  return (
    <Box sx={{ background: '#000', minHeight: '100vh' }}>
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Progress Stepper */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h3" align="center" sx={{ mb: 4, color: 'primary.main' }}>
              Chintu LLM Benchmarking
            </Typography>
            <Stepper activeStep={currentStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel sx={{ 
                    '& .MuiStepLabel-label': { color: 'primary.light' },
                    '& .MuiStepLabel-label.Mui-active': { color: 'primary.main' },
                    '& .MuiStepLabel-label.Mui-completed': { color: 'primary.dark' }
                  }}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Current Step Content */}
          <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '400px' }}>
            {renderCurrentStep()}
          </Box>
        </Container>
      </MainLayout>
    </Box>
  );
};

export default App;