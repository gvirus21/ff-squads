import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

import PageLoading from 'components/common/PageLoading'

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const { data: session, status } = useSession()
  const { data: account, isLoading } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated' || !account) {
      router.push(`/get-started`)
    }
  }, [status, account])

  if (status === 'loading' || isLoading) {
    return <PageLoading />
  }

  return <>{children}</>
}
