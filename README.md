# AARVYA REALTY
### Premium Indian Real Estate Website | Pune, Maharashtra
> *"Find Your Place. Build Your Future."*

A production-ready real estate web application engineered for the Pune and Maharashtra property market. Inspired by the PROTY real estate design language, transformed into an authentic, agency-grade Indian real estate platform.

---

## 🏢 Brand Identity & Office Details

- **Company Name:** AARVYA REALTY
- **Tagline:** Find Your Place. Build Your Future.
- **Office Location:** Hinjewadi, Phase 1, Pune, Maharashtra 411057
- **Direct Phone:** +91 84464 16101
- **Email:** aarvyarealtors@gmail.com
- **Brand Colors:**
  - Primary Orange: `#B66B32`
  - Orange Hover: `#985426`
  - Secondary Accent: `#D89B68`
  - Primary Dark Text: `#292929`
  - Secondary Text: `#747474`
  - Warm Background: `#F8F6F1`
  - Light Cream: `#FCFAF7`
  - Border: `#E9E5DF`
  - Footer Charcoal: `#242424`
- **Typography:** Poppins (Headings) & Inter (Body, UI, Navigation)

---

## 🚀 Key Features

1. **Original Vector Logo:** Custom architectural roofline with keystone 'A' geometry and integrated arched doorway.
2. **12 Section Homepage:**
   - Sticky Navigation Header with active indicators, live wishlist counter, and direct Pune phone CTA
   - Hero Section with luxury Indian residential photography and responsive multi-field search
   - 6 Property Category Cards (1 BHK, 2 BHK, 3 BHK, Luxury, Villas, Commercial)
   - Featured Properties in Maharashtra with INR pricing, badges, and smooth hover elevation
   - Discover How We Can Help (Buying, Renting, Selling)
   - Interactive Home Loan / EMI Calculator with reducing-balance formula and visual ratio breakdown
   - Explore Locations (Baner, Wakad, Kharadi, Hinjawadi, Kothrud, Viman Nagar, Navi Mumbai, Nashik)
   - Property Consultant CTA with direct Hinjewadi enquiry form
   - Why Choose Aarvya Realty (4 core pillars)
   - Client Feedback & Reviews (Pune client testimonials)
   - Real Estate Knowledge Hub (3 editorial articles)
   - Dark Charcoal Footer with newsletter subscription, quick links, and legal disclaimer
3. **Dedicated Pages:**
   - `/properties` — Advanced multi-filter search, grid/list view switcher, sorting
   - `/properties/:id` — Full property gallery, specifications table, amenities, mini EMI calculator, advisory desk
   - `/residential` — Curated apartments & villas
   - `/commercial` — Grade-A offices and retail spaces
   - `/buy` — Pune homebuyer guide, stamp duty & registration notes
   - `/rent` — Rental listings in IT corridors
   - `/sell` — Seller valuation request & 5-step seller process
   - `/services` — 7 comprehensive real estate services
   - `/portfolio` — Completed transactions showcase
   - `/about` — Story, mission, vision, and core values
   - `/blog` & `/blog/:slug` — Real estate knowledge hub
   - `/contact` — Office address, phone, email, map, and requirement submission form
   - `/login` & `/register` — Authentication
   - `/add-property` — Property listing submission
   - `/privacy-policy` & `/terms` — Legal compliance
4. **Backend REST API:**
   - Node.js & Express with MongoDB Atlas schemas
   - Helmet, CORS, Rate Limiting, JWT Auth, Bcrypt hashing
   - Failover mode ensuring 100% frontend uptime even when database is provisioning

---

## 📁 Repository Structure

```
Real Estate Website/
├── client/                     # React 18 + Vite + TypeScript + Tailwind CSS
│   ├── public/                 # Favicon, robots.txt, sitemap.xml
│   ├── src/
│   │   ├── components/         # Header, Footer, Logo, PropertyCard, Search, Calculator, etc.
│   │   ├── context/            # WishlistContext, AuthContext
│   │   ├── data/               # Pune properties, locations, blogs, testimonials
│   │   ├── pages/              # All 18 application pages
│   │   ├── services/           # API and data layer with failover
│   │   ├── types/              # TypeScript interfaces
│   │   ├── utils/              # INR formatters, EMI formula, Indian mobile validation
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── server/                     # Node.js + Express + Mongoose API
│   ├── src/
│   │   ├── config/db.js        # MongoDB connection
│   │   ├── controllers/        # Property, Enquiry, Auth, Blog controllers
│   │   ├── middleware/         # JWT auth, error handling, rate limiting
│   │   ├── models/             # Property, User, Enquiry, Blog, Newsletter schemas
│   │   ├── routes/             # REST endpoints
│   │   ├── seed/seedData.js    # Database seeder
│   │   └── server.js           # Server entry point
│   ├── package.json
│   └── .env.example
├── docs/                       # Deployment, Admin, SEO & QA guides
│   ├── DEPLOYMENT_GUIDE.md
│   ├── ADMIN_GUIDE.md
│   ├── SEO_GUIDE.md
│   └── QA_TEST_REPORT.md
└── README.md
```

---

## 🛠️ Quick Start

### 1. Frontend
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173`.

### 2. Backend
```bash
cd server
npm install
npm run dev
```
Runs on `http://localhost:5000`.

---

## 📜 Documentation Links
- [Production Deployment Guide](file:///c:/SULEMAN/Real%20Estate%20Website/docs/DEPLOYMENT_GUIDE.md)
- [Administrative & Content Guide](file:///c:/SULEMAN/Real%20Estate%20Website/docs/ADMIN_GUIDE.md)
- [SEO & Localization Strategy](file:///c:/SULEMAN/Real%20Estate%20Website/docs/SEO_GUIDE.md)
- [Final QA Testing Report](file:///c:/SULEMAN/Real%20Estate%20Website/docs/QA_TEST_REPORT.md)
