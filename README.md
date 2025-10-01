# VU VPN Helper / VU VPN Vedlys

A web application designed to help Vilnius University (VU) students and staff connect to remote desktop computers through VU VPN. The app provides step-by-step instructions and real-time VPN connection status monitoring.

</br>

### ❌ DEVELOPMENT IN PROGRESS! ❌

</br>

## 🌟 Features

- **Real-time VPN Status Check**: Automatically detects if you're connected to VU VPN
- **Network Detection**: Identifies if you're on the Kaunas Faculty (KNF) network
- **OS-Specific Instructions**: Automatically detects your operating system (macOS/Windows) and provides tailored instructions
- **Step-by-Step Guide**: Interactive stepper interface guides users through:
  1. VU VPN connection verification
  2. Obtaining remote computer IP address
  3. Installing remote desktop software
  4. Connecting to remote desktop


</br>

## 🚀 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **UI Components**: Material-UI (MUI) 7
- **HTTP Client**: Axios
- **Deployment**: Docker + Caddy

</br>

## 📋 Prerequisites

- Ubuntu operating system
- Docker and Docker Compose

</br>

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/kaunofakultetas/vpn-helper.git
   cd vpn-helper
   ```

2. **Copy docker-compose sample file**
   ```bash
   cp docker-compose.yml.sample docker-compose.yml
   ```

3. **OPTIONAL: Modify docker-compose.yml file if needed**
   ```bash
   nano docker-compose.yml
   ```

4. **Start the docker-compose stack**
   ```bash
   ./runUpdateThisStack.sh
   ```

   The app will be available at port 80.

</br>

## 🏗️ Project Structure

```
vpn-helper/
├── vite/                        # Main application
│   ├── app/                     # React application
│   │   ├── public/              # Static assets (images, icons)
│   │   ├── src/
│   │   │   ├── App.jsx          # Main application component
│   │   │   ├── main.jsx         # Application entry point
│   │   │   └── index.css        # Global styles + Tailwind
│   │   ├── index.html           # HTML template
│   │   ├── vite.config.js       # Vite configuration
│   │   ├── tailwind.config.js   # Tailwind configuration
│   │   └── package.json         # Dependencies
│   ├── Dockerfile               # Production Docker image
│   ├── Dockerfile.dev           # Development Docker image
│   └── Caddyfile                # Caddy server configuration
├── endpoint/                    # Reverse proxy configuration
│   └── Caddyfile                # Main endpoint configuration
└── docker-compose.yml           # Docker Compose configuration
```

</br>
