# Aarvya Realty — Administrative & Content Management Guide

## 1. Company Information Configuration

All contact information, office addresses, phone numbers, and emails are managed centrally in:
- `client/src/utils/formatters.ts` (`COMPANY_DETAILS`)
- `server/.env` (`COMPANY_PHONE`, `COMPANY_EMAIL`, `COMPANY_ADDRESS`)

### Current Verified Configuration:
- **Company Name:** AARVYA REALTY
- **Tagline:** Find Your Place. Build Your Future.
- **Office Location:** Hinjewadi, Phase 1, Pune, Maharashtra 411057
- **Direct Phone:** +91 84464 16101
- **Official Email:** aarvyarealtors@gmail.com
- **Operating Hours:** Monday – Saturday: 9:30 AM – 7:30 PM (IST)

---

## 2. Managing Properties

### Adding New Properties via the Web Portal
1. Navigate to `/add-property` or click **"List Your Property"** in the top navigation.
2. Complete the form:
   - Property Title (e.g., "3 BHK Garden Apartment in Baner")
   - Transaction Type ("For Sale" or "For Rent")
   - Category ("Apartment", "Villa", "Commercial Office", etc.)
   - Configuration ("1 BHK", "2 BHK", "3 BHK", "4 BHK")
   - Price in INR (e.g. `8500000` for ₹85 Lakh)
   - Area in sq. ft.
   - Locality (select from Hinjawadi, Baner, Wakad, Kharadi, Viman Nagar, etc.)
   - High-resolution property image URL
3. Submissions are saved to the backend database (or local storage when working in demonstration mode) and become instantly visible in the property catalog.

---

## 3. Handling Enquiries & Leads

- Enquiries submitted from the **Consultant CTA**, **Property Details Page**, or **Contact Us Page** are dispatched to `/api/enquiries`.
- In-browser lead backup ensures no inquiry is lost even during database maintenance.
- Inquiries capture: Client Name, Indian Mobile Number, Email, Locality of interest, Budget, and preferred site inspection timing.
- For immediate customer response, leads should be followed up via phone (`+91 84464 16101`) or official email (`aarvyarealtors@gmail.com`).

---

## 4. Compliance & MahaRERA Guidelines

- In strict compliance with guidelines, no fabricated or unverified MahaRERA numbers are shown on the website.
- If and when project-specific MahaRERA numbers are registered by developers, they can be displayed directly in the property specifications table.
