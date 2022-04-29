import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const { data: session, status } = useSession();
  const { active: metamaskActive } = useWeb3React();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && (status === 'unauthenticated' || !metamaskActive)) {
      router.push(`/community/${id}/login`);
    }
  }, [session, id, metamaskActive]);

  if (!session || !metamaskActive) return null;

  return <>{children}</>;
}
