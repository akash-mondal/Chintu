// This file is part of Chintu LLM Benchmarking System.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import { Buffer } from 'buffer';

// While Vite maps the mode that the application is running in by setting either the
// `PROD` or `DEV` variables, we also need to ensure that `NODE_ENV` is set correctly
// because we also use third-party libraries within the browser (such as Apollo Client),
// that might expect it.
//
// @ts-expect-error - support third-party libraries that require `NODE_ENV`.
globalThis.process = {
  env: {
    NODE_ENV: import.meta.env.MODE, // Map `MODE` to `process.env.NODE_ENV`.
  },
};

// We'll also make use of `Buffer` objects, so we'll ensure a pollyfill for one is
// present on the global object.
globalThis.Buffer = Buffer;

// Add CSS animations and font loading optimization
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px rgba(0, 255, 136, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
    }
    100% {
      box-shadow: 0 0 5px rgba(0, 255, 136, 0.3);
    }
  }

  /* Ensure fonts load with fallbacks */
  @font-face {
    font-family: 'Bitcount Single Ink';
    font-display: swap;
  }

  @font-face {
    font-family: 'Bitcount Grid Double Ink';
    font-display: swap;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 136, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 255, 136, 0.5);
  }
`;
document.head.appendChild(style);