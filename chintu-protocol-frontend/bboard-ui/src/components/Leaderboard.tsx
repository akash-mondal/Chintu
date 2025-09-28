// This file is part of Chintu LLM Benchmarking System.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Box,
  List,
  ListItem,
  Chip,
  LinearProgress,
  Button
} from '@mui/material';
import { 
  EmojiEvents, 
  TrendingUp,
  Star,
  Refresh
} from '@mui/icons-material';
import { useChintContext } from '../hooks';

/**
 * Leaderboard component showing final benchmark results.
 * Displays the model's score and ranking against other models.
 */
export const Leaderboard: React.FC = () => {
  const { 
    leaderboard, 
    finalScore, 
    modelConfig,
    setStep
  } = useChintContext();

  const userModelEntry = leaderboard.find(entry => entry.name === modelConfig?.modelName);
  const userRank = userModelEntry?.rank || 0;

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return '#FFD700'; // Gold
      case 2: return '#C0C0C0'; // Silver  
      case 3: return '#CD7F32'; // Bronze
      default: return 'primary.main';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈'; 
      case 3: return '🥉';
      default: return rank.toString();
    }
  };

  const getScoreCategory = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'success.main' };
    if (score >= 80) return { label: 'Good', color: 'info.main' };
    if (score >= 70) return { label: 'Fair', color: 'warning.main' };
    return { label: 'Needs Improvement', color: 'error.main' };
  };

  const scoreCategory = finalScore ? getScoreCategory(finalScore) : null;

  const restartBenchmark = () => {
    setStep(0);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      {/* User's Score Card */}
      <Card sx={{ mb: 3, border: '2px solid', borderColor: 'primary.main' }}>
        <CardHeader 
          title="Your Benchmark Results" 
          subheader={`${modelConfig?.modelName} Performance`}
          avatar={<Star sx={{ color: getRankColor(userRank) }} />}
          sx={{
            '& .MuiCardHeader-title': { color: 'primary.main', fontSize: '1.5rem' },
            '& .MuiCardHeader-subheader': { color: 'primary.light' }
          }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {finalScore}
              </Typography>
              <Typography variant="h6" color="primary.light">
                out of 100
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ color: getRankColor(userRank), mb: 1 }}>
                #{userRank}
              </Typography>
              <Typography variant="body1" color="primary.light">
                Rank
              </Typography>
            </Box>
          </Box>

          {scoreCategory && (
            <Box sx={{ mb: 2 }}>
              <Chip 
                label={scoreCategory.label}
                sx={{ 
                  bgcolor: scoreCategory.color,
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            </Box>
          )}

          <Typography variant="body2" color="primary.light" sx={{ mb: 2 }}>
            Your model achieved a score of {finalScore}/100 through zero-knowledge benchmarking on 10 private questions.
            This score has been verified and published on-chain.
          </Typography>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader 
          title="Global Leaderboard" 
          subheader="Zero-Knowledge LLM Benchmark Rankings"
          avatar={<EmojiEvents />}
          sx={{
            '& .MuiCardHeader-title': { color: 'primary.main', fontSize: '1.5rem' },
            '& .MuiCardHeader-subheader': { color: 'primary.light' }
          }}
        />
        <CardContent>
          <List>
            {leaderboard.map((entry, index) => {
              const isUserModel = entry.name === modelConfig?.modelName;
              const rank = entry.rank || index + 1;
              return (
                <ListItem 
                  key={entry.name}
                  sx={{
                    mb: 1,
                    border: isUserModel ? '2px solid' : '1px solid',
                    borderColor: isUserModel ? 'primary.main' : 'rgba(168, 168, 168, 0.3)',
                    borderRadius: 2,
                    bgcolor: isUserModel ? 'rgba(168, 168, 168, 0.1)' : 'transparent'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    {/* Rank */}
                    <Box sx={{ 
                      minWidth: 60, 
                      textAlign: 'center',
                      color: getRankColor(rank)
                    }}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {getRankIcon(rank)}
                      </Typography>
                    </Box>

                    {/* Model Info */}
                    <Box sx={{ flexGrow: 1, mx: 2 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: isUserModel ? 'primary.main' : 'primary.light',
                          fontWeight: isUserModel ? 'bold' : 'normal'
                        }}
                      >
                        {entry.name}
                        {isUserModel && (
                          <Chip 
                            label="Your Model" 
                            size="small" 
                            sx={{ ml: 1, bgcolor: 'primary.main', color: 'white' }}
                          />
                        )}
                      </Typography>
                      
                      {/* Score Progress Bar */}
                      <Box sx={{ mt: 1, mb: 0.5 }}>
                        <LinearProgress
                          variant="determinate"
                          value={entry.score}
                          sx={{
                            height: 8,
                            borderRadius: 5,
                            bgcolor: 'rgba(168, 168, 168, 0.3)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 5,
                              bgcolor: isUserModel ? 'primary.main' : getRankColor(rank)
                            }
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Score */}
                    <Box sx={{ minWidth: 80, textAlign: 'right' }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: isUserModel ? 'primary.main' : 'primary.light'
                        }}
                      >
                        {entry.score}
                      </Typography>
                      <Typography variant="caption" color="primary.light">
                        /100
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
              );
            })}
          </List>

          <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(168, 168, 168, 0.1)', borderRadius: 1 }}>
            <Typography variant="body2" color="primary.light" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1, fontSize: '1rem' }} />
              Benchmark Details
            </Typography>
            <Typography variant="body2" color="primary.light" sx={{ mb: 1 }}>
              • All scores verified through zero-knowledge proofs
            </Typography>
            <Typography variant="body2" color="primary.light" sx={{ mb: 1 }}>
              • Private question set prevents gaming and contamination
            </Typography>
            <Typography variant="body2" color="primary.light" sx={{ mb: 1 }}>
              • TEE attestation ensures secure execution environment
            </Typography>
            <Typography variant="body2" color="primary.light">
              • Results published immutably on Midnight Network
            </Typography>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="outlined"
              onClick={restartBenchmark}
              startIcon={<Refresh />}
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  bgcolor: 'rgba(168, 168, 168, 0.1)'
                }
              }}
            >
              Benchmark Another Model
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};