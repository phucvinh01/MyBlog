import type { NextAuthOptions, Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import  { getServerSession } from 'next-auth';
import { Account, User as AuthUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import User from '@/models/user';
import connectDB from '@/util/database';

import {sign} from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { createNewUser } from '@/services/userServices';

export const authOptions: NextAuthOptions = {
  pages:{
    signIn:'/login'
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        await connectDB();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: AuthUser;
      account: Account | null;
    }): Promise<boolean | string> {
      if (account?.provider === 'credentials') {
        return true;
      }
      if (account?.provider === 'github') {
        const newUser = await createNewUser(user);
        if (newUser) {
          console.log('>>>> created');
          return true;
        } else {
          console.log('>>>> create was failed');
          return false;
        }
      }
      if (account?.provider === 'google') {
        const newUser = await createNewUser(user);
        if (newUser) {
          console.log('>>>> created');
          return true;
        } else {
          console.log('>>>> create was failed');
          return false;
        }
      }
      return false;
    },

    async jwt({ token, user }: { token: JWT; user: AuthUser }): Promise<any> {
      if (user) {
        token.accessToken = sign(
          {
            userId: user.id,
            email: user.email,
            
          },
          process.env.JWT_SECRET as string,
          { expiresIn: 600 * 600 }
        );

        token.refreshToken = sign(
          {
            userId: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET as string,
          { expiresIn: 6000 * 6000 }
        );
      }
      return token;
    },
    
    async session({
      session,
      token,
      user
    }: {
      session: Session;
      token: JWT;
      user: AuthUser
    }): Promise<any> {
      console.log(user);
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
};
export const getNextAuthServerSession = () => getServerSession(authOptions);
