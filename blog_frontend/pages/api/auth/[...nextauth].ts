import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_CLIENT_KEY,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_KEY,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
});
