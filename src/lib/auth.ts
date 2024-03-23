import { type NextAuthOptions } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import prisma from './prisma-db'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface CustomJWT extends JWT {
  id?: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token as CustomJWT;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  // debug: process.env.NODE_ENV === 'development',
  // Configure one or more authentication providers here
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_APP_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "name@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined, req): Promise<AuthUser> {
        // check to see if email and password is in db
        if(!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password')
        }
        // check to see if user exists in db
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        // if no user is found
        if(!user || !user?.hashedPassword) {
          throw new Error('No user found')
        }
        // check to see if password matches
        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        // if passwords don't match
        if(!passwordsMatch) {
          throw new Error('Incorrect password')
        }

        // return user
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      }
    }),
  ],
};