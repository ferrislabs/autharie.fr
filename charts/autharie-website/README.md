# autharie-website

Serves the Autharie marketing site (`apps/website`) as static files from nginx, exposed
through a Gateway API `HTTPRoute`. No Ingress, no database, no secret.

## What it creates

| Resource | Notes |
|---|---|
| `Deployment` | nginx, non-root (uid 101), read-only root filesystem, scratch `emptyDir` for `/run`, `/var/cache/nginx` and `/tmp`, rolling update with `maxUnavailable: 0` |
| `Service` | `ClusterIP`, port 80 to the container's 8080 |
| `HTTPRoute` | One host list, security headers set by the route, `/_astro/*` cached as immutable |
| `HTTPRoute` (redirect) | Optional 301 from other hostnames (for example `www`) to the main one |
| `PodDisruptionBudget` | Only when more than one replica can run |
| `HorizontalPodAutoscaler` | Optional, on CPU |
| `NetworkPolicy` | Optional default deny for ingress, then the Gateway's namespace |
| `ServiceAccount` | No token mounted |

## Required values

- `image.tag`: an immutable tag such as `sha-<commit>`. The chart refuses an empty tag and `latest`.
- `gatewayApi.hostnames` and `gatewayApi.parentRefs`: the host and the shared Gateway to attach to.

`values-production.yaml` carries the production overrides (two replicas, HSTS, the `www`
redirect, autoscaling, the network policy). Check its `parentRefs` against the real Gateway
before use.

## Image

Built from the repository `Dockerfile`:

```
docker build --build-arg APP=website -t ghcr.io/ferrislabs/autharie-website:sha-<commit> .
```

The `PUBLIC_*` variables (`PUBLIC_CONSOLE_URL`, `PUBLIC_DOCS_URL`, `PUBLIC_BLOG_URL`,
`PUBLIC_WEBSITE_URL`) are read when the site is built, not when the container starts. They
cannot be set from this chart. Pass them as build arguments if the defaults are not right.

## Validate

```
helm lint charts/autharie-website -f charts/autharie-website/values-production.yaml --set image.tag=sha-abc1234
helm template web charts/autharie-website -f charts/autharie-website/values-production.yaml --set image.tag=sha-abc1234
```

Bump `Chart.yaml` `version` on any template or default change.

## GitOps

`.github/workflows/docker.yaml` builds the image and ArgoCD deploys it:

| Event | Image tags | Deployed |
|---|---|---|
| push to `main` | `sha-<7 chars>` | yes: the workflow commits the tag to `values-production.yaml`, ArgoCD syncs |
| tag `v0.1.0` | `0.1.0` and `latest` | no |
| tag `v0.1.0-rc1` | `0.1.0-rc1` | no |

`latest` is never put on a sha build. The Application and its project are in
`deploy/argocd/`. The `autharie.fr` apex has its own listeners on `autharie-gateway`
(`autharie-apex-http` and `autharie-apex-https`, in `deploy/autharie/gateway.yaml` of the aether
repository, applied with kubectl). The route cannot attach until they exist.
