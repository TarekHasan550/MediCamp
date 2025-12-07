import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { fetchAPI } from './lib/api-client';

class InvalidLoginError extends CredentialsSignin {
  code = 'User not found';
}
class InvalidPasswordError extends CredentialsSignin {
  code = 'Password is incorrect';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, request) {
        const { email, password } = credentials;
        const { data, error } = await fetchAPI('/users/signin', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        const user = data.data.user;
        const token = data.data.token;

        if (error) {
          throw new InvalidPasswordError();
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          accessToken: token,
        };
      },
    }),
    Github,
    Google,
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'github') {
        const { data, error } = await fetchAPI('/users/signup-oauth', {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
          }),
        });

        if (error) {
          throw new Error(error);
        }
        user.id = data.data.user._id.toString();
        user.role = data.data.user.role;
        user.accessToken = data.data.token;
      } else if (account?.provider === 'google') {
        const { data, error } = await fetchAPI('/users/signup-oauth', {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
          }),
        });

        if (error) {
          throw new Error(error);
        }
        user.id = data.data.user._id.toString();
        user.role = data.data.user.role;
        user.accessToken = data.data.token;
      }
      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 10 * 24 * 60 * 60 * 1000,
  },
  secret: process.env.AUTH_SECRET,
});
