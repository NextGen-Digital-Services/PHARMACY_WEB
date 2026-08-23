# VitaDerm — Skincare & Nutrition Pharmacy E-Commerce Platform

This is a **Frontend-Only, Production-Grade Demo Build** for **VitaDerm**, a clinical pharmacy specializing in Dermatology (skincare) and Nutrition (supplements/wellness) products.

## 🔬 Tech Stack
* **Framework:** React + Vite (Plain JavaScript JSX, no TypeScript)
* **Routing:** React Router v6
* **Animation:** Framer Motion (Drawer transitions, SVG loaders, and counter transitions)
* **State Management:** React Context API (`CartContext`, `AuthContext`, `AdminDataContext`) for in-memory sync across the storefront and admin panels
* **Styling:** Vanilla CSS with custom properties (CSS Custom Tokens) — no Tailwind, no third-party UI kits, solid flat apothecary theme only
* **Icons:** `lucide-react`
* **Image Sourcing:** Real hotlinked high-resolution Unsplash URLs matching category contents

---

## 🏷️ Signature Motif: "Apothecary Label" Identity
The design relies on a signature medical receipt motif:
1. **Perforated Cards:** Product cards, category chips, and cart summary tags are styled with dashed borders running alongside circular notches on the margins (`::before` / `::after` cutouts) to simulate ticket tabs.
2. **Ribbons:** Corner ribbons identify categories or badges (e.g., *Bestseller*, *New*).
3. **Monospaced Values:** Prices, quantities, SKUs, and transaction IDs are rendered exclusively in `IBM Plex Mono` to convey a printed recipe slip layout.

---

## 📂 Project Architecture
The project is scaffolded using the exact requested directory hierarchy:
```text
vitaderm-ecommerce/
├── public/                  # Favicons and static assets
├── src/
│   ├── assets/              # Custom SVGs / assets
│   ├── components/
│   │   ├── common/          # Reusable components (Navbar, Badge, Card, etc.)
│   │   ├── layout/          # Frames (Customer, Admin, Split Auth)
│   │   ├── home/            # Home sections (Hero, Bestsellers, Testimonials)
│   │   ├── product/         # Product view pieces (Gallery, Tabs, Sticky bar)
│   │   ├── cart/            # Drawer overlays and checkout lists
│   │   ├── checkout/        # Step wizard forms (Address, Selector, Review)
│   │   ├── account/         # Profile editors and order trackers
│   │   └── admin/           # Administrative headers, stat cards, SVGs
│   ├── pages/
│   │   ├── customer/        # Customer storefront views (Shop, Track, Confirm)
│   │   └── admin/           # Administration panels (CRUD Products, Statuses)
│   ├── data/                # Seed files (160 mock products, orders, reviews)
│   ├── context/             # States (Cart, Auth, AdminDatabase)
│   ├── hooks/               # Custom hooks (useScrollReveal, useCounter, useDebounce)
│   ├── routes/              # React Router mapping paths
│   └── styles/              # Design tokens, CSS resets, layout files
```

---

## ⚙️ Running the Project

### 1. Install Dependencies
Run the command below in the project root:
```bash
npm install
```

### 2. Launch Local Dev Server
Start Vite's development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront.

### 3. Generate Build Bundle
Ensure the application builds cleanly without any errors:
```bash
npm run build
```

---

## 🔑 Demo Access Credentials
* **Customer Login:**
  * **Email:** `demo@vitaderm.com`
  * **Password:** `demo123`
* **Admin Login:**
  * **Email:** `admin@vitaderm.com`
  * **Password:** `admin123`
  * *Note: The admin panel can also be reached directly by clicking "Admin Portal" in the navigation links once logged in.*

---

## 📢 Mock Execution Disclaimer
* All dynamic updates (adding to cart, creating orders at checkout, updating fulfillment stages, adding/modifying products) occur **strictly in-memory** inside session states.
* **No databases or payment gates are integrated.** A page refresh will reset data back to the default seed files.
