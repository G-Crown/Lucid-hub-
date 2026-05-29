# Lucid Hub — Leadership Development Platform

> **Inspire . Empower . Transform.**

A premium Next.js 14 platform for Africa's leading leadership development organisation — featuring live events, mentorship matchmaking, a donor pipeline, and a full learning hub.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + middleware |
| Hosting | Vercel (recommended) |
| Payments | Paystack |

---

## 📁 Project Structure

```
lucid-hub/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── about/              # About Lucid Hub
│   ├── events/             # Events & Training Engine
│   ├── mentorship/         # Mentorship Portal
│   ├── learning/           # Learning Hub
│   ├── donate/             # Donor Pipeline
│   ├── contact/            # Contact page
│   └── admin/              # Admin dashboard (protected)
│       ├── login/
│       ├── dashboard/
│       ├── events/
│       ├── mentorship/
│       ├── users/
│       ├── resources/
│       └── settings/
├── components/             # Shared React components
├── lib/                    # Supabase client & auth helpers
├── database/               # SQL schema
├── public/                 # Static assets (logos, images)
└── middleware.ts           # Route protection
```

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-org/lucid-hub.git
cd lucid-hub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### 4. Set up the database
- Go to your [Supabase dashboard](https://supabase.com)
- Create a new project
- Open the SQL editor and run `database/schema.sql`

### 5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Connect repository on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy — Vercel auto-deploys on every push to `main`

---

## 📧 Contact

**Lucid Hub** · lucidhub.info@gmail.com
