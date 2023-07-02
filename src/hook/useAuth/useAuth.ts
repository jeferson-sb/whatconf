import { signIn, signOut, useSession } from 'next-auth/react'

export const useAuth = () => {
  const { data, status } = useSession()

  return {
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    isUnauthenticated: status === 'unauthenticated',
    session: data,
    signIn: () => signIn(),
    signOut: () => signOut(),
  }
}
