// This file is part of Chintu LLM Benchmarking System.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Button, 
  TextField, 
  Typography, 
  Box,
  Alert,
  Backdrop,
  CircularProgress,
  Chip
} from '@mui/material';
import { Computer, Security, Code } from '@mui/icons-material';
import { useChintContext } from '../hooks';

/**
 * TEE attestation configuration component.
 * Allows users to provide the curl command for hardware attestation verification.
 */
export const AttestationConfig: React.FC = () => {
  const { setAttestationCommand, isProcessing, errorMessage } = useChintContext();
  
  const [command, setCommand] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateCommand = (cmd: string): boolean => {
    if (!cmd.trim()) {
      setValidationError('Attestation command is required');
      return false;
    }
    
    if (!cmd.toLowerCase().includes('curl')) {
      setValidationError('Command must be a curl request');
      return false;
    }
    
    if (!cmd.toLowerCase().includes('attestation') && !cmd.toLowerCase().includes('hash')) {
      setValidationError('Command should fetch attestation or hash data');
      return false;
    }
    
    setValidationError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validateCommand(command)) {
      return;
    }
    
    await setAttestationCommand(command);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCommand(value);
    
    // Clear validation error when user starts typing
    if (validationError && value.trim()) {
      setValidationError(null);
    }
  };

  const exampleCommand = `curl -X GET "https://attestation-service.example.com/api/v1/hash" \\
  -H "Authorization: Bearer your-token" \\
  -H "Content-Type: application/json"`;

  const isFormValid = command.trim() && !validationError;

  return (
    <Box sx={{ position: 'relative' }}>
      <Backdrop
        sx={{ position: 'absolute', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isProcessing}
      >
        <CircularProgress />
      </Backdrop>
      
      <Card sx={{ maxWidth: 700, mx: 'auto' }}>
        <CardHeader 
          title="TEE Attestation" 
          subheader="Verify hardware attestation for secure benchmarking"
          avatar={<Security />}
          sx={{
            '& .MuiCardHeader-title': { color: 'primary.main', fontSize: '1.5rem' },
            '& .MuiCardHeader-subheader': { color: 'primary.light' }
          }}
        />
        <CardContent>
          <Typography variant="body1" color="primary.light" sx={{ mb: 2 }}>
            Provide the curl command that fetches the hardware attestation hash of your Trusted Execution Environment (TEE).
            This ensures your model runs in a secure, verifiable environment.
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary.main" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Computer sx={{ mr: 1 }} />
              Why TEE Attestation?
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip 
                label="Hardware Security" 
                variant="outlined" 
                size="small" 
                sx={{ color: 'primary.light', borderColor: 'primary.light' }}
              />
              <Chip 
                label="Tamper Detection" 
                variant="outlined" 
                size="small" 
                sx={{ color: 'primary.light', borderColor: 'primary.light' }}
              />
              <Chip 
                label="Verifiable Execution" 
                variant="outlined" 
                size="small" 
                sx={{ color: 'primary.light', borderColor: 'primary.light' }}
              />
            </Box>
          </Box>
          
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <TextField
            label="Attestation Command"
            multiline
            rows={6}
            fullWidth
            value={command}
            onChange={handleInputChange}
            placeholder={exampleCommand}
            error={!!validationError}
            helperText={validationError || "Curl command to fetch TEE attestation hash"}
            InputProps={{
              style: { color: 'white', fontFamily: 'monospace' }
            }}
            InputLabelProps={{
              style: { color: '#a8a8a8' }
            }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(168, 168, 168, 0.1)', borderRadius: 1 }}>
            <Typography variant="body2" color="primary.light" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
              <Code sx={{ mr: 1, fontSize: '1rem' }} />
              Example Command:
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontFamily: 'monospace', 
                color: 'primary.light', 
                whiteSpace: 'pre-line',
                fontSize: '0.85rem'
              }}
            >
              {exampleCommand}
            </Typography>
          </Box>

          <Typography variant="body2" color="primary.light" sx={{ mb: 3, fontStyle: 'italic' }}>
            <Security sx={{ mr: 1, fontSize: '1rem' }} />
            The attestation hash will be verified on-chain to ensure benchmark integrity
          </Typography>
          
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ 
              py: 1.5,
              fontSize: '1.1rem',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
              '&:disabled': { bgcolor: 'primary.light' }
            }}
            onClick={handleSubmit}
            disabled={!isFormValid || isProcessing}
            startIcon={<Security />}
          >
            Submit Attestation
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};