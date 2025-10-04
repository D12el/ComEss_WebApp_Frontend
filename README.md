# bugcatch-frontend

Frontend server for the ComEss WebApp project.

This service serves static files via Express.js and requires the backend service (ComEss_WebApp_Backend) to be running in development.

# Features

Static file hosting with Express

Ready for deployment or local development

Lightweight configuration

# Installation

Clone the repository and install dependencies:

git clone <repo-url>
cd bugcatch-frontend-main
npm install

# Usage

Start the server with:

npm start


The server will run at:

http://localhost:3221


Static files will be served from the public/ directory.

# Development Notes

Place your frontend build/static files in the public/ folder (e.g., index.html, CSS, JS).

Update PORT in server.js if you need a different port.

Ensure firewall rules or cloud provider allow external access if deploying online.
