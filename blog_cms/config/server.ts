export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "df3b12ff57543d4aed89ae3a350cae5b"),
    },
    url: process.env.PUBLIC_ADMIN_URL
  }
});
