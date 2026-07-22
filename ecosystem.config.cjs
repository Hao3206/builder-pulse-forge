module.exports = {
  apps: [
    {
      name: "zdhjsuo-web",
      script: "./dist/server/node-build.mjs",
      // SQLite and crawler sessions are process-local, so production must use
      // one process unless those state stores are externalized.
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        PLAYWRIGHT_BROWSERS_PATH: "/var/lib/zdeaee/playwright",
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
    },
  ],
};
