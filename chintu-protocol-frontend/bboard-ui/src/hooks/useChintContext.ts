// This file is part of Chintu LLM Benchmarking System.
// Copyright (C) 2025 Midnight Foundation
// SPDX-License-Identifier: Apache-2.0

import { useContext } from 'react';
import { ChintContext, type ChintContextType } from '../contexts';

/**
 * Retrieves the currently in-scope Chintu workflow state and operations.
 *
 * @returns The currently in-scope {@link ChintContextType} implementation.
 *
 * @throws Error if no ChintProvider is found in the component tree
 */
export const useChintContext = (): ChintContextType => {
  const context = useContext(ChintContext);

  if (!context) {
    throw new Error('useChintContext must be used within a ChintProvider');
  }

  return context;
};