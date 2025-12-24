# Indoss Energy Tool - Docker Setup

This repository contains containerized applications for Indoss Energy:
1. **Indoss Energy Tool** - Full-stack solar calculator (FastAPI + React/Vite)
2. **Indoss Website** - Company website (React Router v7)

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

## Quick Start

### 1. Clone or copy the entire Tool folder to your PC

### 2. Navigate to the Tool directory

```bash
cd "d:\OneDrive\Indoss Energy\Tool"
```

Or on another PC:
```bash
cd /path/to/Tool
```

### 3. Build and start all services

```bash
docker-compose up --build
```

This will:
- Build all Docker images
- Start all containers
- Set up networking between services

### 4. Access the applications

Once all containers are running:

- **Energy Tool Frontend**: http://localhost:5173
- **Energy Tool Backend API**: http://localhost:8000
  - API Docs: http://localhost:8000/docs
  - API Health Check: http://localhost:8000/api/ping
- **Indoss Website**: http://localhost:3000

## Container Management

### Start services (after initial build)

```bash
docker-compose up
```

### Start in detached mode (run in background)

```bash
docker-compose up -d
```

### Stop all services

```bash
docker-compose down
```

### Rebuild a specific service

```bash
docker-compose build energy-tool-backend
docker-compose build energy-tool-frontend
docker-compose build indoss-website
```

### View logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f energy-tool-backend
docker-compose logs -f energy-tool-frontend
docker-compose logs -f indoss-website
```

### Restart a specific service

```bash
docker-compose restart energy-tool-backend
```

## Project Structure

```
Tool/
├── docker-compose.yml              # Orchestrates all services
├── .dockerignore                   # Global Docker ignore rules
├── Indoss_energy_tool/
│   ├── backend/
│   │   ├── Dockerfile             # Backend container config
│   │   ├── .dockerignore
│   │   ├── requirements.txt       # Python dependencies
│   │   └── main.py               # FastAPI application
│   └── frontend/
│       ├── Dockerfile             # Frontend container config
│       ├── .dockerignore
│       └── package.json          # Node dependencies
└── Indoss_website/
    ├── Dockerfile                 # Website container config
    ├── .dockerignore
    └── package.json              # Node dependencies
```

## Services Overview

### Energy Tool Backend
- **Technology**: Python 3.11, FastAPI, Uvicorn
- **Port**: 8000
- **Auto-reload**: Enabled for development
- **Dependencies**: Managed via requirements.txt

### Energy Tool Frontend
- **Technology**: Node 20, React, Vite, TypeScript
- **Port**: 5173
- **Hot Module Replacement**: Enabled
- **Dependencies**: Managed via npm

### Indoss Website
- **Technology**: Node 20, React Router v7
- **Port**: 3000
- **Build**: Multi-stage production build
- **Dependencies**: Managed via npm

## Troubleshooting

### Port already in use

If you get a "port already in use" error, either:
1. Stop the service using that port
2. Or modify the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "NEW_PORT:CONTAINER_PORT"
```

### Permission issues (Linux/Mac)

```bash
sudo docker-compose up
```

### Clear everything and start fresh

```bash
# Stop and remove all containers, networks
docker-compose down

# Remove all images
docker-compose down --rmi all

# Remove volumes as well
docker-compose down -v --rmi all

# Rebuild from scratch
docker-compose up --build
```

### View running containers

```bash
docker-compose ps
```

### Access container shell

```bash
# Backend
docker exec -it indoss-energy-backend /bin/bash

# Frontend
docker exec -it indoss-energy-frontend /bin/sh

# Website
docker exec -it indoss-website /bin/sh
```

## Development Workflow

The containers are set up with volume mounts, meaning:
- Changes to source code are reflected immediately
- Backend has auto-reload enabled
- Frontend has Hot Module Replacement (HMR)
- No need to rebuild containers for code changes

However, if you modify dependencies:
```bash
# For backend (requirements.txt changed)
docker-compose up --build energy-tool-backend

# For frontend/website (package.json changed)
docker-compose up --build energy-tool-frontend
docker-compose up --build indoss-website
```

## Production Deployment

For production use:

1. Create separate production Dockerfiles with optimized builds
2. Use environment variables for configuration
3. Set up reverse proxy (nginx/traefik)
4. Enable HTTPS with SSL certificates
5. Use production-grade databases
6. Implement proper logging and monitoring

## Environment Variables

You can customize the setup by creating a `.env` file in the Tool directory:

```env
# Backend
BACKEND_PORT=8000

# Frontend
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:8000

# Website
WEBSITE_PORT=3000
```

Then update `docker-compose.yml` to use these variables.

## Notes

- The `node_modules` and `venv` directories are created inside containers and excluded from host mounts for better performance
- Windows users: Make sure Docker Desktop is running before executing commands
- The setup uses Docker networks to allow containers to communicate with each other
- All services restart automatically unless stopped explicitly

## Support

For issues or questions:
1. Check container logs: `docker-compose logs -f`
2. Verify all services are running: `docker-compose ps`
3. Ensure Docker is up to date
4. Check available disk space

## Clean Up

To remove all containers, networks, and images related to this project:

```bash
docker-compose down --rmi all -v
```

This frees up disk space but requires rebuilding on next run.
