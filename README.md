# Real Estate Property Finder with Mapbox Geospatial Testing

A full-featured real estate web application built using React, Mapbox GL JS, Puppeteer, and Docker. This platform allows users to explore property listings on an interactive map, apply advanced geospatial filters, and perform automated integration testing.

This project is designed to demonstrate real-world frontend development, geospatial data handling, and integration testing.

---

## Features

### Core Features

- Interactive Mapbox map with property markers
- Property listing sidebar synchronized with map
- Location autocomplete search
- Radius-based property filtering using Haversine formula
- Polygon boundary search using Mapbox Draw
- Property detail page with map and coordinates
- Nearby amenities with distance calculation
- Save property functionality using local storage
- Responsive design for desktop and mobile devices

---

### Testing Features

- Puppeteer integration tests
- Automated map initialization test
- Location autocomplete test
- Geospatial radius filtering test
- Map marker interaction test
- Property filtering test
- Saved searches test

---

### DevOps Features

- Fully Dockerized application
- Docker Compose setup
- Automated test execution inside Docker
- Environment variable configuration
- Test results generation

---

## Tech Stack

Frontend:
- React
- Vite
- JavaScript
- CSS

Geospatial:
- Mapbox GL JS
- Mapbox Geocoding API
- Mapbox Draw Plugin

Testing:
- Puppeteer
- Jest

DevOps:
- Docker
- Docker Compose

---

## Project Structure

real-estate-mapbox/
├── src/                # Components, Pages, Context, Utils, Styles
├── tests/              # Puppeteer integration tests
├── test-results/       # Automated test reports
├── Dockerfile          # App configuration
├── Dockerfile.test     # Test runner configuration
├── docker-compose.yml  # Container orchestration
└── .env.example        # Environment template


---

## Dataset

The application uses a mock dataset containing 30+ properties distributed across:

- San Francisco
- Los Angeles
- New York

Each property includes:

- ID
- Title
- Price
- Address
- Coordinates
- Bedrooms
- Bathrooms
- Property type
- Description

---

## Environment Setup

Create a `.env` file in the root directory:

VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here


---

## Running Locally

Install dependencies:

npm install


Start development server:

npm run dev


Open in browser:

http://localhost:5173/properties


---

## Running with Docker

Build and start containers:

docker-compose up --build


Application will run at:

http://localhost:3006


---

## Running Integration Tests

Run inside Docker:

docker-compose exec puppeteer-integration-tests npm run test:integration