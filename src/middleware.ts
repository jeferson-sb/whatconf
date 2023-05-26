// export { default } from 'next-auth/middleware'

import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // req.nextauth.token
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token?.role === 'admin'
      },
    },
  }
)

// Match protected routes below
// export const config = { matcher: ['/create'] }
