# Real Estate Property Finder with Mapbox Geospatial Testing

A full-featured real estate web application built with React, Mapbox GL JS, Puppeteer, and Docker. This project allows users to search, filter, and interact with property listings using advanced geospatial features.

---

## 🚀 Features

### Core Functionality
* **Interactive Mapbox Map:** Real-time property markers and synchronization.
* **Synced Sidebar:** Property listings stay in sync with the current map view.
* **Advanced Search:** Location autocomplete via Mapbox Geocoding API.
* **Geospatial Filtering:** Radius-based filtering using the Haversine formula:
    $$d = 2r \arcsin\left(\sqrt{\sin^2\left(\frac{\phi_2 - \phi_1}{2}\right) + \cos(\phi_1) \cos(\phi_2) \sin^2\left(\frac{\lambda_2 - \lambda_1}{2}\right)}\right)$$
* **Polygon Search:** Custom boundary search using Mapbox Draw.
* **Responsive Design:** Optimized for desktop, tablet, and mobile devices.

### Testing & QA
* **Puppeteer Integration:** End-to-end testing for map initialization.
* **Interaction Testing:** Automated validation of autocomplete and marker clicks.
* **Logic Verification:** Specialized tests for radius filtering and saved searches.

### DevOps & Deployment
* **Dockerized:** Fully containerized environment for consistency.
* **CI/CD Ready:** Automated integration test execution via Docker Compose.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Mapbox GL JS, Mapbox GL Draw |
| **Testing** | Puppeteer, Jest |
| **DevOps** | Docker, Docker Compose |

---

## 📂 Project Structure

```text
real-estate-mapbox/
├── src/
│   ├── components/    # Reusable UI elements
│   ├── pages/         # Main view logic
│   ├── context/       # State management
│   ├── utils/         # Geospatial helpers
│   ├── styles/        # CSS/SCSS files
│   └── data/          # Mock property data
├── tests/
│   └── integration/   # Puppeteer test suites
├── Dockerfile         # App container
├── Dockerfile.test    # Test environment container
├── docker-compose.yml # Orchestration
└── package.json       # Dependencies