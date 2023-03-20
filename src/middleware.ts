export { default } from 'next-auth/middleware'

// Match protected routes below
export const config = { matcher: ['/create'] }
