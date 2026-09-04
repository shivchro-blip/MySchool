# Stale — not in use

The files in this directory (`examcoach-backend.service`, `nginx.conf`, `deploy.sh`) describe a former Ubuntu/systemd/nginx deployment that is not how this app is actually deployed. `api.yadhum.net` runs on Render (confirmed via response headers: `rndr-id`, `x-render-origin-server`), and Render's configuration lives in the Render dashboard, not in this repo.
