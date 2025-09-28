// This file is part of Chintu LLM Benchmarking System.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import { createTheme } from '@mui/material/styles';

// Custom colors for the tech theme
const colors = {
  primary: '#00ff88', // Bright green for primary actions
  secondary: '#88ccff', // Light blue for secondary elements
  accent: '#ff6b6b', // Coral for warnings/errors
  text: {
    primary: '#ffffff',
    secondary: '#e0e0e0',
    disabled: '#888888'
  },
  background: {
    default: '#000000',
    paper: 'rgba(0, 0, 0, 0.9)',
    overlay: 'rgba(0, 0, 0, 0.95)'
  }
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      dark: '#00cc6a',
      light: '#33ff99',
      contrastText: '#000000'
    },
    secondary: {
      main: colors.secondary,
      dark: '#5599cc',
      light: '#aaddff'
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled
    },
    error: {
      main: colors.accent
    }
  },
  typography: {
    fontFamily: [
      '"Bruno Ace SC"',
      'monospace',
      'sans-serif'
    ].join(','),
    h1: {
      fontFamily: '"Bruno Ace SC", monospace',
      fontWeight: 400,
      fontSize: '3rem',
      letterSpacing: '0.05em',
      textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)'
    },
    h2: {
      fontFamily: '"Bruno Ace SC", monospace', 
      fontWeight: 400,
      fontSize: '2.5rem',
      letterSpacing: '0.03em',
      textShadow: '2px 2px 5px rgba(0, 0, 0, 0.9)'
    },
    h3: {
      fontFamily: '"Bruno Ace SC", monospace',
      fontWeight: 400,
      fontSize: '2rem',
      letterSpacing: '0.02em',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)'
    },
    h4: {
      fontFamily: '"Bruno Ace SC", monospace',
      fontWeight: 400,
      fontSize: '1.5rem',
      letterSpacing: '0.02em',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.9)'
    },
    h5: {
      fontFamily: '"Bruno Ace SC", monospace',
      fontWeight: 400,
      fontSize: '1.25rem',
      letterSpacing: '0.02em',
      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.9)'
    },
    h6: {
      fontFamily: '"Bruno Ace SC", monospace',
      fontWeight: 400,
      fontSize: '1.1rem',
      letterSpacing: '0.02em',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.9)'
    },
    body1: {
      fontFamily: '"Bruno Ace SC", monospace',
      fontSize: '1rem',
      lineHeight: 1.7,
      fontWeight: 400,
      letterSpacing: '0.01em',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
    },
    body2: {
      fontFamily: '"Bruno Ace SC", monospace',
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 400,
      letterSpacing: '0.01em',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
    },
    button: {
      fontFamily: '"Bruno Ace SC", monospace',
      fontWeight: 400,
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
      textShadow: 'none'
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          border: `2px solid ${colors.primary}`,
          borderRadius: 16,
          boxShadow: `0 8px 32px rgba(0, 255, 136, 0.2)`,
          '&:hover': {
            boxShadow: `0 12px 40px rgba(0, 255, 136, 0.3)`,
            borderColor: colors.secondary,
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: colors.primary,
          color: '#000000',
          border: `2px solid ${colors.primary}`,
          borderRadius: 12,
          padding: '14px 28px',
          fontSize: '0.95rem',
          fontWeight: 700,
          textShadow: 'none',
          boxShadow: `0 4px 20px rgba(0, 255, 136, 0.4)`,
          '&:hover': {
            backgroundColor: colors.secondary,
            borderColor: colors.secondary,
            color: '#000000',
            boxShadow: `0 6px 30px rgba(136, 204, 255, 0.5)`,
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease'
          },
          '&:disabled': {
            backgroundColor: colors.text.disabled,
            color: '#333333',
            border: `2px solid ${colors.text.disabled}`,
            boxShadow: 'none'
          }
        },
        outlined: {
          color: colors.primary,
          borderColor: colors.primary,
          borderWidth: 2,
          backgroundColor: 'rgba(0, 255, 136, 0.1)',
          '&:hover': {
            borderColor: colors.secondary,
            color: colors.secondary,
            backgroundColor: 'rgba(136, 204, 255, 0.2)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: 12,
            '& fieldset': {
              borderColor: colors.text.secondary,
              borderWidth: 2
            },
            '&:hover fieldset': {
              borderColor: colors.primary
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
              boxShadow: `0 0 15px rgba(0, 255, 136, 0.3)`
            },
            '& input': {
              color: colors.text.primary,
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)'
            }
          },
          '& .MuiInputLabel-root': {
            color: colors.text.secondary,
            fontWeight: 500,
            '&.Mui-focused': {
              color: colors.primary
            }
          }
        }
      }
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent'
        }
      }
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: colors.text.secondary,
          fontFamily: '"Inter", sans-serif',
          fontWeight: 500,
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
          '&.Mui-active': {
            color: colors.primary,
            fontWeight: 600,
            textShadow: `1px 1px 2px rgba(0, 0, 0, 0.8)`
          },
          '&.Mui-completed': {
            color: colors.secondary,
            fontWeight: 500
          }
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 6,
          height: 8
        },
        bar: {
          backgroundColor: colors.primary,
          boxShadow: `0 0 15px rgba(0, 255, 136, 0.5)`,
          borderRadius: 6
        }
      }
    }
  }
});