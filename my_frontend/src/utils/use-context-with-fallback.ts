import React, { useContext } from 'react'

export function useContextWithFallback<ContextValue>(
  context: React.Context<ContextValue>,
  fallback: ContextValue,
): ContextValue {
  try {
    return useContext(context)
  } catch {
    return fallback
  }
}
