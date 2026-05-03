# Kubernetes manifests

These are templates. They are NOT meant to be applied as-is to a real cluster.
Use them as a starting point for kustomize / helm / argocd.

## Structure

- `namespace.yaml` — single namespace `comic-platform`
- `common-configmap.yaml` — non-secret config shared by all services
- `common-secrets.yaml` — secret template (replace before applying; use Vault/External Secrets in real env)
- `auth-service.yaml` — example service manifest (Deployment + Service + PDB + HPA)

## Per-service deployment

Copy `auth-service.yaml`, rename, and change:
- `metadata.name` and labels: `app: <service-name>`
- `image`: `ghcr.io/your-org/<service-name>:<tag>`
- `containerPort` / `targetPort` / probe ports → service port
- `env.PORT` and `env.SERVICE_NAME`
- `env.DATABASE_URL` host (e.g. `comic-db` for comic-service); REMOVE for storage/web-api
- `env.REDIS_URL` if applicable

Service ports:
| Service | Port |
|---------|------|
| comic-service | 3001 |
| auth-service | 3002 |
| storage-service | 3003 |
| notification-service | 3004 |
| config-service | 3005 |
| web-api-service | 3006 |
| post-service | 3007 |
| iam-service | 3008 |
| marketing-service | 3009 |
| introduction-service | 3010 |

## What's missing (TODO before going live)

- StatefulSets for Postgres / Redis / Kafka — prefer managed services (RDS, ElastiCache, MSK)
- Ingress / Gateway for public traffic (auth, web-api)
- NetworkPolicy to restrict cross-service traffic
- ServiceMonitor for Prometheus
- ExternalSecret resources tied to your secrets backend
