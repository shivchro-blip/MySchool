# Deployment Guide

## Local Development (your machine)

```bash
# Terminal 1
ollama serve

# Terminal 2
cd backend && uvicorn main:app --reload --port 8000

# Terminal 3
cd frontend/web && npm run dev

# Terminal 4 (optional)
cd frontend/admin && npm run dev
```

## Cloud Deployment (Ubuntu server)

### 1. First-time server setup

```bash
# On the server
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx python3.11 python3.11-venv nodejs npm git

# Install Ollama
curl https://ollama.ai/install.sh | sh
ollama pull mistral:7b-instruct

# Clone project
sudo mkdir -p /opt/examcoach
sudo chown ubuntu:ubuntu /opt/examcoach
cd /opt/examcoach
git clone <your-repo-url> .

# Backend venv
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn[standard] pydantic pydantic-settings \
    supabase chromadb httpx python-multipart python-dotenv \
    pdfplumber langchain-text-splitters sentence-transformers

# Copy and fill .env
cp .env.example .env
nano .env  # fill in all values

# Systemd services
sudo cp /opt/examcoach/deploy/examcoach-backend.service \
        /etc/systemd/system/
sudo cp /opt/examcoach/deploy/ollama.service \
        /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable examcoach-backend ollama
sudo systemctl start  examcoach-backend ollama

# Nginx
sudo cp /opt/examcoach/deploy/nginx.conf \
        /etc/nginx/sites-available/examcoach
sudo ln -s /etc/nginx/sites-available/examcoach \
           /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Directories for built files
sudo mkdir -p /var/www/examcoach/{web,admin}
sudo chown -R ubuntu:ubuntu /var/www/examcoach
```

### 2. First deploy

```bash
bash /opt/examcoach/deploy/deploy.sh
```

### 3. Subsequent deploys

```bash
# From your local machine
ssh ubuntu@your-server-ip "bash /opt/examcoach/deploy/deploy.sh"
```

### 4. HTTPS (recommended)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Ports

| Port  | Service             | Exposed |
|-------|---------------------|---------|
| 8000  | FastAPI backend     | No (nginx proxies) |
| 11434 | Ollama              | No (local only) |
| 80    | Nginx (HTTP)        | Yes |
| 443   | Nginx (HTTPS)       | Yes |
