# Production Deployment Checklist

Complete every item before going live.

## Server Setup
- [ ] Ubuntu 22.04 LTS server provisioned (min 4 CPU, 32GB RAM for Ollama)
- [ ] SSH key-based access only (password auth disabled)
- [ ] Firewall: only ports 22, 80, 443 open
- [ ] Ollama installed and model pulled: `ollama pull mistral:7b-instruct`
- [ ] Python 3.11 installed and venv created
- [ ] Node 20 installed
- [ ] Nginx installed and configured

## Environment
- [ ] backend/.env filled with production values
- [ ] SECRET_KEY is a random 64-char string (not default)
- [ ] APP_ENV=production
- [ ] ALLOWED_ORIGINS set to your real domain
- [ ] SUPABASE credentials are production project credentials
- [ ] frontend/web/.env.local points to production Supabase
- [ ] frontend/admin/.env.local points to production Supabase

## Supabase
- [ ] Production Supabase project created (not the dev project)
- [ ] All 4 migration SQL files run on production database
- [ ] RLS policies verified (test with anon key)
- [ ] Admin user created and role set
- [ ] Email confirmation enabled for signups

## Content
- [ ] At least one chapter fully processed (PDF → JSON → embed → DB)
- [ ] Content chunks validated in admin panel
- [ ] Questions validated in admin panel
- [ ] Tested explain endpoint with real content
- [ ] Tested evaluate endpoint with real question

## Security
- [ ] API docs disabled (APP_ENV=production disables /api/docs)
- [ ] Ollama bound to 127.0.0.1 only (not exposed to internet)
- [ ] Admin panel login tested with non-admin account (should fail)
- [ ] Rate limiting tested (submit 21 requests as free user)
- [ ] HTTPS configured (certbot / Let's Encrypt)

## Monitoring
- [ ] /health endpoint returns ok for all services
- [ ] Systemd services set to restart automatically
- [ ] Log rotation configured for uvicorn and nginx
- [ ] Backup strategy for Supabase (enable PITR)
- [ ] Alert set up if /health fails (UptimeRobot free tier works)

## Performance
- [ ] ChromaDB embeddings directory on fast disk
- [ ] Ollama model pre-loaded (test cold start time)
- [ ] Cache hit rate checked after first day (target > 30%)
- [ ] Response time acceptable (explain < 10s, evaluate < 15s on Ollama)
