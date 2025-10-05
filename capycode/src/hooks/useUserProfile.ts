// Temporary stub for missing user profile hook
// Replace with real implementation when backend / auth is ready
import { useMemo } from 'react';

export interface UserProfile {
  email: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
}

export function useUserProfile(): UserProfile | null {
  // Could integrate with Auth0 user in future
  return useMemo(() => null, []);
}
