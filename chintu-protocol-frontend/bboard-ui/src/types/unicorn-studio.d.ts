// This file is part of Chintu LLM Benchmarking System.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => Promise<any>;
      addScene: (config: any) => Promise<any>;
      destroy: () => void;
    };
  }
}

export {};