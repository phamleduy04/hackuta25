// Temporary stub for user profile actions
// Provides a no-op updateProfile to satisfy existing UI component
import { useCallback, useState } from 'react';

interface UpdateProfileInput {
  first_name?: string;
  last_name?: string;
}

export function useUserProfileWithActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(async (_data: UpdateProfileInput) => {
    try {
      setLoading(true);
      setError(null);
      // simulate latency
      await new Promise(r => setTimeout(r, 400));
      return true;
  } catch {
      setError('Failed to update (stub)');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateProfile, loading, error };
}
