import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/lib/users";

// Control de intentos fallidos
const loginAttempts: Record<string, { count: number; lastAttempt: number }> = {};
const MAX_ATTEMPTS = 5;
const BLOCK_TIME = 5 * 60 * 1000; // 5 minutos

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;

        // Verificar bloqueo
        const attempts = loginAttempts[email];
        if (attempts) {
          const tiempoTranscurrido = Date.now() - attempts.lastAttempt;
          if (attempts.count >= MAX_ATTEMPTS && tiempoTranscurrido < BLOCK_TIME) {
            throw new Error('Demasiados intentos. Espera 5 minutos.');
          }
          if (tiempoTranscurrido >= BLOCK_TIME) {
            delete loginAttempts[email];
          }
        }

        const user = findUserByEmail(email);
        if (!user) {
          loginAttempts[email] = {
            count: (loginAttempts[email]?.count || 0) + 1,
            lastAttempt: Date.now(),
          };
          throw new Error('Credenciales inválidas');
        }

        const valid = await bcrypt.compare(credentials?.password as string, user.password);
        if (!valid) {
          loginAttempts[email] = {
            count: (loginAttempts[email]?.count || 0) + 1,
            lastAttempt: Date.now(),
          };
          throw new Error('Credenciales inválidas');
        }

        // Login exitoso, limpiar intentos
        delete loginAttempts[email];
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/signIn',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };