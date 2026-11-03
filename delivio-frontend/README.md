# AMOGE Frontend

AMOGE is a modern Nigerian food ordering and delivery frontend built with React, Vite, TypeScript, and Tailwind CSS. The app presents a mobile-friendly experience for browsing local dishes, filtering by category, saving favorites, adding items to a cart, and placing a demo order.

## Website overview
AMOGE is designed to feel like a real food delivery app for customers in Nigeria. Users can:

- browse featured meals and restaurant-style food listings
- search for meals or restaurants
- filter food by categories
- view detailed food information in a modal
- save favorites to local storage
- manage a shopping cart with quantity controls
- checkout with a demo delivery address and payment selection
- review placed orders and customer profile details

The interface is optimized for both desktop and mobile screens and includes a lightweight PWA setup for installable mobile-web behavior.

## Tech stack
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Lucide React icons

## Requirements
- Node.js 20+
- npm

## Getting started
```bash
npm install
npm run dev
```
Then open the local URL shown in the terminal, usually:

http://localhost:5173

## Production build
```bash
npm run build
npm run preview
```

## Project features
- home page with food discovery and promotional hero section
- category navigation and search
- food detail modal with quantity selection
- favorites saved in localStorage
- cart summary with automatic subtotal, delivery, and service fees
- checkout flow with demo payment method selection
- demo order placement and order history
- profile and role dashboard preview
- responsive layout for desktop and mobile use
- PWA manifest and service worker support

## Demo limitations
This project is a frontend prototype and does not connect to a real backend or payment gateway. It does not authenticate users, process real transactions, dispatch riders, or sync data across devices.

Checkout creates a local demo order only, and all cart and order data is stored in browser local storage. Food images are loaded from Unsplash, so an internet connection is required to display them.

## Folder structure
```bash
delivio-frontend/
├── public/
├── src/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## License
This project is provided for demonstration and learning purposes.
