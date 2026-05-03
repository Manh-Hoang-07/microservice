// pm2 process manifest. Used by `pm2 start ecosystem.config.js` and the
// `pm2 reload ecosystem.config.js --update-env` line in deploy.yml.
//
// Each service uses fork mode (single process) by default. Switch a service
// to `cluster` mode (replicas: N) only after verifying it is stateless or
// uses a shared store (Redis) for any in-process caches — e.g. the LRU dedup
// in notification-service is per-process and double-counting under cluster
// mode is acceptable but worth noting.

const SERVICES = [
  { name: 'auth-service',          port: 3002, prisma: true  },
  { name: 'comic-service',         port: 3001, prisma: true  },
  { name: 'config-service',        port: 3005, prisma: true  },
  { name: 'iam-service',           port: 3008, prisma: true  },
  { name: 'introduction-service',  port: 3010, prisma: true  },
  { name: 'marketing-service',     port: 3009, prisma: true  },
  { name: 'notification-service',  port: 3004, prisma: true  },
  { name: 'post-service',          port: 3007, prisma: true  },
  { name: 'storage-service',       port: 3003, prisma: false },
  { name: 'web-api-service',       port: 3006, prisma: false },
];

module.exports = {
  apps: SERVICES.map((svc) => ({
    name: svc.name,
    cwd: `apps/${svc.name}`,
    script: 'dist/main.js',
    node_args: '-r tsconfig-paths/register',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '768M',
    kill_timeout: 30000,           // give graceful-shutdown hooks 30s
    wait_ready: false,
    listen_timeout: 30000,
    env: {
      NODE_ENV: 'production',
      PORT: svc.port,
      SERVICE_NAME: svc.name,
    },
    error_file: `/var/log/comic-platform/${svc.name}.err.log`,
    out_file:   `/var/log/comic-platform/${svc.name}.out.log`,
    merge_logs: true,
    time: true,
  })),
};
