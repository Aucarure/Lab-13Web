import { withAuth } from "next-auth/middleware"

export const middleware = withAuth({
  pages: {
    signIn: "/signIn",
  },
})

export const config = { matcher: ["/dashboard", "/profile"] }