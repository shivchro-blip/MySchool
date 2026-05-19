#!/bin/bash
# Production deployment script
# Run on your cloud server after SSH in
# Usage: bash deploy/deploy.sh

set -e

echo "=== AI Exam Coach — Deploy ==="

PROJECT_DIR="/opt/examcoach"
WEB_DIR="/var/www/examcoach/web"
ADMIN_DIR="/var/www/examcoach/admin"

# ── Pull latest code ─────────────────────────────────────────────────────
echo "[1/7] Pulling latest code..."
cd $PROJECT_DIR
git pull origin main

# ── Backend ──────────────────────────────────────────────────────────────
echo "[2/7] Installing backend dependencies..."
cd $PROJECT_DIR/backend
source .venv/bin/activate
pip install -r requirements.txt --quiet

echo "[3/7] Restarting backend service..."
sudo systemctl restart examcoach-backend
sudo systemctl status  examcoach-backend --no-pager

# ── Frontend web ─────────────────────────────────────────────────────────
echo "[4/7] Building student web app..."
cd $PROJECT_DIR/frontend/web
npm ci --silent
npm run build
sudo rm   -rf  $WEB_DIR
sudo cp   -r   dist/. $WEB_DIR

# ── Admin panel ──────────────────────────────────────────────────────────
echo "[5/7] Building admin panel..."
cd $PROJECT_DIR/frontend/admin
npm ci --silent
npm run build
sudo rm   -rf  $ADMIN_DIR
sudo cp   -r   dist/. $ADMIN_DIR

# ── Nginx ────────────────────────────────────────────────────────────────
echo "[6/7] Reloading nginx..."
sudo nginx -t
sudo systemctl reload nginx

# ── Health check ─────────────────────────────────────────────────────────
echo "[7/7] Health check..."
sleep 2
curl -sf http://localhost:8000/health && echo " Backend OK" || echo " Backend WARN"

echo ""
echo "=== Deploy complete ==="
echo "Student app: http://your-domain.com"
echo "Admin panel: http://your-domain.com/admin"
echo "API docs:    disabled in production"
