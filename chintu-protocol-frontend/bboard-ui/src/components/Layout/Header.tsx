// This file is part of Chintu LLM Benchmarking System.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { AppBar, Box, Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

/**
 * A tech-styled header for the Chintu LLM benchmarking application.
 */
export const Header: React.FC = () => (
  <AppBar
    position="static"
    data-testid="header"
    sx={{
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 100%)',
      backdropFilter: 'blur(15px)',
      borderBottom: '2px solid rgba(0, 255, 136, 0.3)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    {/* Left side - Midnight logo */}
    <Box
      sx={{
        display: 'flex',
        px: 4,
        py: 2,
        alignItems: 'center',
      }}
      data-testid="header-logo"
    >
      <img 
        src="/midnight-logo.png" 
        alt="Midnight Network" 
        height={40}
        style={{
          filter: 'brightness(1.1) contrast(1.2)'
        }}
      />
    </Box>

    {/* Center - Chintu branding */}
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }}>
      <Psychology sx={{ 
        color: 'primary.main', 
        fontSize: '2.2rem',
        filter: 'drop-shadow(0 0 10px rgba(0, 255, 136, 0.4))'
      }} />
      <Typography 
        variant="h4" 
        sx={{ 
          color: 'primary.main',
          fontFamily: '"Inter", sans-serif',
          fontWeight: 800,
          letterSpacing: '0.1em',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          fontSize: '1.8rem'
        }}
      >
        CHINTU
      </Typography>
    </Box>

    {/* Right side - Network indicator */}
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      px: 4,
      gap: 1
    }}>
      <Box sx={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'primary.main',
        boxShadow: '0 0 10px rgba(0, 255, 136, 0.7)',
        animation: 'pulse 2s infinite'
      }} />
      <Typography variant="body2" sx={{ 
        color: 'text.primary',
        fontFamily: '"Inter", sans-serif',
        fontWeight: 600,
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
      }}>
        TESTNET
      </Typography>
    </Box>
  </AppBar>
);
