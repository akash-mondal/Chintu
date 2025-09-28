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
  LinearProgress, 
  Box,
  Alert,
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  PlayArrow, 
  QuestionMark, 
  CheckCircle, 
  RadioButtonUnchecked,
  Publish
} from '@mui/icons-material';
import { useChintContext } from '../hooks';

/**
 * Benchmark execution component.
 * Manages the 10-question benchmark process with progress tracking and signing.
 */
export const BenchmarkRunner: React.FC = () => {
  const { 
    startBenchmark, 
    benchmarkProgress, 
    isProcessing, 
    errorMessage,
    modelConfig
  } = useChintContext();

  const { currentQuestion, totalQuestions, isRunning, isComplete } = benchmarkProgress;
  const progress = (currentQuestion / totalQuestions) * 100;

  const renderQuestionStatus = (questionNum: number) => {
    if (questionNum < currentQuestion) {
      return <CheckCircle sx={{ color: 'success.main' }} />;
    } else if (questionNum === currentQuestion && isRunning) {
      return <CircularProgress size={20} sx={{ color: 'primary.main' }} />;
    } else {
      return <RadioButtonUnchecked sx={{ color: 'primary.light' }} />;
    }
  };

  const getQuestionStatusText = (questionNum: number) => {
    if (questionNum < currentQuestion) {
      return 'Completed & Signed';
    } else if (questionNum === currentQuestion && isRunning) {
      return 'Processing...';
    } else {
      return 'Pending';
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Backdrop
        sx={{ position: 'absolute', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isProcessing && !isRunning}
      >
        <CircularProgress />
      </Backdrop>
      
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardHeader 
          title="Run Benchmark" 
          subheader={`Zero-knowledge evaluation of ${modelConfig?.modelName || 'your model'}`}
          avatar={<QuestionMark />}
          sx={{
            '& .MuiCardHeader-title': { color: 'primary.main', fontSize: '1.5rem' },
            '& .MuiCardHeader-subheader': { color: 'primary.light' }
          }}
        />
        <CardContent>
          {!isRunning && !isComplete && (
            <>
              <Typography variant="body1" color="primary.light" sx={{ mb: 2 }}>
                Ready to start benchmarking your model with 10 private questions. Each question will be:
              </Typography>
              
              <Box sx={{ mb: 3, pl: 2 }}>
                <Typography variant="body2" color="primary.light" sx={{ mb: 1 }}>
                  • Sent to your model API inside the TEE
                </Typography>
                <Typography variant="body2" color="primary.light" sx={{ mb: 1 }}>
                  • Processed privately without data exposure
                </Typography>
                <Typography variant="body2" color="primary.light" sx={{ mb: 1 }}>
                  • Response signed with zero-knowledge proof
                </Typography>
                <Typography variant="body2" color="primary.light" sx={{ mb: 1 }}>
                  • Verified against private solution set
                </Typography>
              </Box>

              {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              <Typography variant="body2" color="primary.light" sx={{ mb: 3, fontStyle: 'italic' }}>
                Each question requires ~30-40 seconds for secure processing and will need your signature for proof generation.
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
                onClick={startBenchmark}
                disabled={isProcessing}
                startIcon={<PlayArrow />}
              >
                Start Benchmark
              </Button>
            </>
          )}

          {(isRunning || isComplete) && (
            <>
              <Typography variant="h6" color="primary.main" sx={{ mb: 2 }}>
                Benchmark Progress
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="primary.light">
                    Question {currentQuestion} of {totalQuestions}
                  </Typography>
                  <Typography variant="body2" color="primary.light">
                    {Math.round(progress)}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 5,
                      bgcolor: 'primary.main'
                    }
                  }}
                />
              </Box>

              <List dense>
                {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((questionNum) => (
                  <ListItem key={questionNum} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {renderQuestionStatus(questionNum)}
                    </ListItemIcon>
                    <ListItemText 
                      primary={`Question ${questionNum}`}
                      secondary={getQuestionStatusText(questionNum)}
                      sx={{
                        '& .MuiListItemText-primary': { 
                          color: questionNum <= currentQuestion ? 'primary.main' : 'primary.light' 
                        },
                        '& .MuiListItemText-secondary': { 
                          color: 'primary.light',
                          fontSize: '0.75rem'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              {isComplete && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 1 }}>
                  <Typography variant="body1" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Publish sx={{ mr: 1 }} />
                    Benchmark Complete! Results published on-chain.
                  </Typography>
                  <Typography variant="body2" color="primary.light" sx={{ mt: 1 }}>
                    All 10 questions processed and signed with zero-knowledge proofs.
                  </Typography>
                </Box>
              )}

              {isRunning && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(168, 168, 168, 0.1)', borderRadius: 1 }}>
                  <Typography variant="body2" color="primary.light" sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    Processing question {currentQuestion}... Please confirm signing requests as they appear.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};