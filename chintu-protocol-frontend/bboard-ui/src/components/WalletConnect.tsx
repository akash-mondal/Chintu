// This file is part of Chintu LLM Benchmarking System.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Button, 
  Typography, 
  Box,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { Security, Computer, VerifiedUser } from '@mui/icons-material';
import { useChintContext } from '../hooks';

/**
 * Welcome screen and wallet connection component for Chintu.
 */
export const WalletConnect: React.FC = () => {
  const { connectWallet, isProcessing } = useChintContext();

  return (
    <Box sx={{ position: 'relative' }}>
      <Backdrop
        sx={{ position: 'absolute', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isProcessing}
      >
        <CircularProgress />
      </Backdrop>
      
      <Card sx={{ maxWidth: 500, mx: 'auto' }}>
        <CardHeader 
          title="Welcome to Chintu" 
          subheader="Zero-Knowledge LLM Benchmarking on Midnight Network"
          sx={{
            '& .MuiCardHeader-title': { color: 'primary.main', fontSize: '1.5rem' },
            '& .MuiCardHeader-subheader': { color: 'primary.light' }
          }}
        />
        <CardContent>
          <Typography variant="body1" color="primary.light" sx={{ mb: 3 }}>
            Chintu provides zero-knowledge benchmarking for Large Language Models using TEE attestation 
            and private verification to prevent data contamination and ensure benchmark integrity.
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary.main" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Computer sx={{ mr: 1 }} />
              Key Features:
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography variant="body2" color="primary.light" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Security sx={{ mr: 1, fontSize: '1rem' }} />
                Zero-knowledge proof generation for private benchmarking
              </Typography>
              <Typography variant="body2" color="primary.light" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <VerifiedUser sx={{ mr: 1, fontSize: '1rem' }} />
                TEE attestation for hardware-level security
              </Typography>
              <Typography variant="body2" color="primary.light" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <Computer sx={{ mr: 1, fontSize: '1rem' }} />
                Prevents benchmark contamination and gaming
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="primary.light" sx={{ mb: 3 }}>
            Connect your Midnight Lace wallet to begin the benchmarking process.
          </Typography>
          
          <Button 
            variant="contained" 
            fullWidth 
            onClick={connectWallet}
            disabled={isProcessing}
            startIcon={<Security />}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            Connect Midnight Wallet
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};