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
  CircularProgress
} from '@mui/material';
import { Settings, Api } from '@mui/icons-material';
import { useChintContext } from '../hooks';
import type { ModelConfig as ModelConfigType } from '../contexts';

/**
 * Model configuration form component.
 * Allows users to configure their LLM API details for benchmarking.
 */
export const ModelConfig: React.FC = () => {
  const { setModelConfig, isProcessing, errorMessage, clearError } = useChintContext();
  
  const [config, setConfig] = useState<ModelConfigType>({
    baseUrl: '',
    modelName: '',
    apiKey: ''
  });

  const [validationErrors, setValidationErrors] = useState<Partial<ModelConfigType>>({});

  const validateForm = (): boolean => {
    const errors: Partial<ModelConfigType> = {};
    
    if (!config.baseUrl) {
      errors.baseUrl = 'Base URL is required';
    } else if (!config.baseUrl.startsWith('http')) {
      errors.baseUrl = 'Base URL must start with http:// or https://';
    }
    
    if (!config.modelName) {
      errors.modelName = 'Model name is required';
    }
    
    if (!config.apiKey) {
      errors.apiKey = 'API key is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validationErrors && Object.keys(validationErrors).length > 0) {
      clearError();
    }
    
    if (!validateForm()) {
      return;
    }
    
    await setModelConfig(config);
  };

  const handleInputChange = (field: keyof ModelConfigType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfig(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const isFormValid = config.baseUrl && config.modelName && config.apiKey && 
                     Object.keys(validationErrors).length === 0;

  return (
    <Box sx={{ position: 'relative' }}>
      <Backdrop
        sx={{ position: 'absolute', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isProcessing}
      >
        <CircularProgress />
      </Backdrop>
      
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardHeader 
          title="Configure Your Model" 
          subheader="Provide API details for LLM access within TEE"
          avatar={<Settings />}
          sx={{
            '& .MuiCardHeader-title': { color: 'primary.main', fontSize: '1.5rem' },
            '& .MuiCardHeader-subheader': { color: 'primary.light' }
          }}
        />
        <CardContent>
          <Typography variant="body2" color="primary.light" sx={{ mb: 3 }}>
            Chintu uses OpenAI-compatible API structure to securely access your LLM inside the Trusted Execution Environment (TEE).
            Your API credentials will be protected and not exposed during benchmarking.
          </Typography>
          
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Base URL"
              fullWidth
              margin="normal"
              value={config.baseUrl}
              onChange={handleInputChange('baseUrl')}
              placeholder="https://api.your-model.com/v1"
              error={!!validationErrors.baseUrl}
              helperText={validationErrors.baseUrl || "The base URL endpoint for your model's API"}
              InputProps={{
                style: { color: 'white' }
              }}
              InputLabelProps={{
                style: { color: '#a8a8a8' }
              }}
            />
            
            <TextField
              label="Model Name"
              fullWidth
              margin="normal"
              value={config.modelName}
              onChange={handleInputChange('modelName')}
              placeholder="your-model-name"
              error={!!validationErrors.modelName}
              helperText={validationErrors.modelName || "The specific model identifier to use for benchmarking"}
              InputProps={{
                style: { color: 'white' }
              }}
              InputLabelProps={{
                style: { color: '#a8a8a8' }
              }}
            />
            
            <TextField
              label="API Key"
              type="password"
              fullWidth
              margin="normal"
              value={config.apiKey}
              onChange={handleInputChange('apiKey')}
              placeholder="sk-..."
              error={!!validationErrors.apiKey}
              helperText={validationErrors.apiKey || "Your API key for authentication (kept secure in TEE)"}
              InputProps={{
                style: { color: 'white' }
              }}
              InputLabelProps={{
                style: { color: '#a8a8a8' }
              }}
            />
          </Box>

          <Typography variant="body2" color="primary.light" sx={{ mb: 3, fontStyle: 'italic' }}>
            <Api sx={{ mr: 1, fontSize: '1rem' }} />
            All credentials are processed securely within the Trusted Execution Environment
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
            startIcon={<Settings />}
          >
            Configure Model
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};