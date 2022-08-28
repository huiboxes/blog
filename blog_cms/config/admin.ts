export default ({ env }) => ({
  auth: {
    url: env('PUBLIC_ADMIN_URL', '/panel'),
    secret: env("ADMIN_JWT_SECRET", "df3b12ff57543d4aed89ae3a350cae5b"),
  },
});
