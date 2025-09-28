// This file is part of Chintu LLM Benchmarking System.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Box } from '@mui/material';

/**
 * Provides layout for the Chintu LLM benchmarking application.
 */
export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Video background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            zIndex: -1
          }}
        >
          <source src="/video.webm" type="video/webm" />
          {/* Fallback for browsers that don't support webm */}
          Your browser does not support the video tag.
        </video>
        
        {/* Optional overlay to darken video for better text readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjust opacity as needed
            zIndex: 1
          }}
        />
      </Box>
      
      {/* Content overlay */}
      <Box sx={{ 
        position: 'relative', 
        zIndex: 10,
        minHeight: '100vh',
        background: 'rgba(0, 0, 0, 0.2)', // Light overlay for readability
        backdropFilter: 'blur(0.5px)'
      }}>
        {children}
      </Box>
    </Box>
  );
};