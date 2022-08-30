module.exports = {
  apps: [
    {
      name: 'blog_cms',
      cwd: '/root/project/blog/blog_cms',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        DATABASE_HOST: '42.193.20.47',
        DATABASE_PORT: '3996',
        DATABASE_NAME: 'blog_cms',
        DATABASE_USERNAME: 'blog_dba',
        DATABASE_PASSWORD: 'Wh@aT8B*V5w7qp$r^t'
      },
    },
  ]
};

