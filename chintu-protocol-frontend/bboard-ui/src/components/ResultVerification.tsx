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
  Alert,
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  VerifiedUser, 
  Security, 
  CheckCircle, 
  Visibility,
  Assessment
} from '@mui/icons-material';
import { useChintContext } from '../hooks';

/**
 * Result verification component.
 * Handles the agent verification of question-answer pairs against the private solution set.
 */
export const ResultVerification: React.FC = () => {
  const { 
    verifyResults, 
    verificationComplete, 
    isProcessing, 
    errorMessage,
    modelConfig,
    benchmarkProgress
  } = useChintContext();

  const verificationSteps = [
    {
      title: "Agent Initialization",
      description: "Secure agent deployed within TEE environment",
      icon: <Security />
    },
    {
      title: "Answer Retrieval", 
      description: "Fetching your model's responses from secure storage",
      icon: <Visibility />
    },
    {
      title: "Private Comparison",
      description: "Comparing answers against private solution set",
      icon: <Assessment />
    },
    {
      title: "Score Calculation",
      description: "Computing final benchmark score with zero-knowledge proofs",
      icon: <VerifiedUser />
    }
  ];

  return (
    <Box sx={{ position: 'relative' }}>
      <Backdrop
        sx={{ position: 'absolute', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isProcessing}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="body2" color="white">
            Verification agent processing results...
          </Typography>
        </Box>
      </Backdrop>
      
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardHeader 
          title="Verify Results" 
          subheader="Private verification of benchmark answers"
          avatar={<VerifiedUser />}
          sx={{
            '& .MuiCardHeader-title': { color: 'primary.main', fontSize: '1.5rem' },
            '& .MuiCardHeader-subheader': { color: 'primary.light' }
          }}
        />
        <CardContent>
          {!verificationComplete && (
            <>
              <Typography variant="body1" color="primary.light" sx={{ mb: 3 }}>
                An autonomous verification agent will now check your model's answers against the private solution set. 
                This process ensures fairness while maintaining the privacy of both questions and correct answers.
              </Typography>

              <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(168, 168, 168, 0.1)', borderRadius: 1 }}>
                <Typography variant="h6" color="primary.main" sx={{ mb: 2 }}>
                  Benchmark Summary
                </Typography>
                <Typography variant="body2" color="primary.light" sx={{ mb: 1 }}>
                  <strong>Model:</strong> {modelConfig?.modelName}
                </Typography>
                <Typography variant="body2" color="primary.light" sx={{ mb: 1 }}>
                  <strong>Questions Processed:</strong> {benchmarkProgress.totalQuestions}
                </Typography>
                <Typography variant="body2" color="primary.light">
                  <strong>Status:</strong> Ready for verification
                </Typography>
              </Box>

              <Typography variant="h6" color="primary.main" sx={{ mb: 2 }}>
                Verification Process
              </Typography>

              <List>
                {verificationSteps.map((step, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        {step.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={step.title}
                        secondary={step.description}
                        sx={{
                          '& .MuiListItemText-primary': { color: 'primary.main' },
                          '& .MuiListItemText-secondary': { color: 'primary.light' }
                        }}
                      />
                    </ListItem>
                    {index < verificationSteps.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>

              {errorMessage && (
                <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              <Typography variant="body2" color="primary.light" sx={{ mt: 3, mb: 3, fontStyle: 'italic' }}>
                <Security sx={{ mr: 1, fontSize: '1rem' }} />
                All verification happens within the TEE - no data leaves the secure environment
              </Typography>
              
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  py: 1.5,
                  fontSize: '1.1rem',
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
                onClick={verifyResults}
                disabled={isProcessing}
                startIcon={<VerifiedUser />}
              >
                Start Verification
              </Button>
            </>
          )}

          {verificationComplete && (
            <Box>
              <Box sx={{ mb: 3, p: 3, bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 1, textAlign: 'center' }}>
                <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                <Typography variant="h5" color="success.main" sx={{ mb: 1 }}>
                  Verification Complete!
                </Typography>
                <Typography variant="body1" color="primary.light">
                  Your model's answers have been privately verified against the solution set.
                </Typography>
              </Box>

              <Typography variant="body2" color="primary.light" sx={{ mb: 2 }}>
                The verification agent has completed its analysis:
              </Typography>

              <List>
                {verificationSteps.map((step, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={step.title}
                      secondary="✓ Completed successfully"
                      sx={{
                        '& .MuiListItemText-primary': { color: 'primary.main' },
                        '& .MuiListItemText-secondary': { color: 'success.main', fontSize: '0.8rem' }
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography variant="body2" color="primary.light" sx={{ mt: 2, textAlign: 'center', fontStyle: 'italic' }}>
                Score calculation and leaderboard placement ready!
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};