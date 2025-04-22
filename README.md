# 🛫 Flight Tracker - DevOps Demo

A real-time flight tracking web application with a full CI/CD DevOps pipeline.

## 🚀 Features

- Real-time flight data via OpenSky API
- Flask backend API
- Plain JavaScript frontend with Leaflet.js map
- Auto-refreshing flight data every 30 seconds
- CI/CD with GitHub Actions (planned)
- Dockerized deployment
- AWS EC2 and RDS setup (coming next)

## 📦 Project Structure

```
flight-tracker-devops/
├── backend
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
├── cleanup.sh
├── frontend
│   ├── app.js
│   ├── Dockerfile
│   ├── index.html
│   └── nginx.conf
├── infra
│   └── docker-compose.yml
└── README.md
```

## 🌍 Latest Enhancements (Apr 2025)

- Europe-focused map view
- Aircraft markers now update and animate in-place
- Flight info popups with altitude and origin
- Backend filters flights within EU airspace only
- Nginx configured as reverse proxy for clean API routing
- Docker Compose uses port 3000 (frontend) and 5050 (backend)

## 📡 Deployment Targets

- EC2 (Docker Compose)
- PostgreSQL via AWS RDS (Free Tier - optional)
- Public API integration with OpenSky Network

## 🔧 To Run Locally

```bash
./cleanup.sh
docker-compose up --build
```

Visit:
- Frontend: http://localhost:3000
- API: http://localhost:5050/api/flights

## 📚 Coming Next

- Push to Docker Hub
- Setup GitHub Actions CI/CD to deploy on EC2
- Optional: Add Prometheus + Grafana monitoring