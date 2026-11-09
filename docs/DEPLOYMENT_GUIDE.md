# Aarvya Realty — Production Deployment & Configuration Guide

**Location:** Hinjewadi, Phase 1, Pune, Maharashtra  
**Platform Stack:** React 18, Vite, TypeScript, Tailwind CSS, Node.js, Express, MongoDB Atlas

---

## 1. Local Development Setup

### Prerequisites
- Node.js v18+ (tested on Node v24.21.0)
- npm or pnpm
- MongoDB (local community edition) or MongoDB Atlas free cloud tier

### Running the Client (Frontend)
```bash
cd client
npm install
npm run dev
```
The client will launch at `http://localhost:5173`.

### Running the Server (Backend)
```bash
cd server
npm install
npm run dev
```
The server will run on `http://localhost:5000`.

---

## 2. Frontend Deployment on Vercel

1. Push your repository to GitHub / GitLab.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Set **Root Directory** to `client`.
5. Build settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Environment Variables (optional if connecting to hosted backend):
   - `VITE_API_BASE_URL`: `https://your-api.onrender.com`
7. Click **Deploy**.
8. The provided `client/vercel.json` ensures all client-side routes (`/properties`, `/residential`, `/contact`, etc.) resolve to `index.html` without 404 errors.

---

## 3. Backend Deployment on Render / Railway

### Render.com Setup
1. Create a new **Web Service** on Render.
2. Select repository and set Root Directory to `server`.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Configure Environment Variables:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `mongodb+srv://<db_user>:<password>@cluster0.mongodb.net/aarvya_realty?retryWrites=true&w=majority`
   - `JWT_SECRET`: Generate a secure 64-character secret string.
   - `COMPANY_PHONE`: `+91 84464 16101`
   - `COMPANY_EMAIL`: `aarvyarealtors@gmail.com`
   - `COMPANY_ADDRESS`: `Hinjewadi, Phase 1, Pune, Maharashtra 411057`

---

## 4. MongoDB Atlas Database Integration

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and register a free cluster (M0 sandbox).
2. Choose AWS Region: `ap-south-1` (Mumbai, India) for lowest latency to Pune and Maharashtra users.
3. Under **Database Access**, create a user with read/write permissions.
4. Under **Network Access**, add IP `0.0.0.0/0` (Allow Access from Anywhere) or specify your hosting provider's egress IPs.
5. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/aarvya_realty?retryWrites=true&w=majority
   ```
6. Run the initial data seeder from the server directory:
   ```bash
   npm run seed
   ```

---

## 5. Domain, DNS & SSL Configuration

1. **Domain Purchase:** Register `aarvyarealty.in` or `aarvyarealtors.in` via GoDaddy, Namecheap, or Google Domains.
2. **DNS Records (for Vercel):**
   - Type `A`: `@` -> `76.76.21.21`
   - Type `CNAME`: `www` -> `cname.vercel-dns.com`
3. **SSL Certificate:**
   - Vercel and Render automatically provision free Let's Encrypt Wildcard SSL certificates upon DNS verification.
   - Force HTTPS redirect is enabled by default.
