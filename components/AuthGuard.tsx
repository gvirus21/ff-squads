import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id && status === 'unauthenticated') {
      router.push(`/community/${id}/login`);
    }
  }, [session, id]);

  if (!session) return null;

  return <>{children}</>;
}
