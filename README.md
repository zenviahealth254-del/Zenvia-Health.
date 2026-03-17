# ZENVIA Health Guardian

A **teen-led digital healthcare platform** enabling patients to access doctor consultations, health records, diagnostic tests, and AI-powered health insights.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn

### Setup

```sh
# Clone the repository
git clone <YOUR_REPO_URL>

# Navigate to project directory
cd zen-health-guardian-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will run on `http://localhost:5173`

## 🏗️ Technology Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- shadcn/ui (component library)
- Tailwind CSS
- React Router v6
- React Query (state management)

**Backend:**
- Supabase (PostgreSQL + Auth)
- Supabase Edge Functions (serverless)
- Row-Level Security (RLS) for data isolation

**Deployment:**
- Deploy to Vercel, Netlify, or any static host
- Environment variables: Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

## 📁 Project Structure

- `src/pages/` - Page components (auth, dashboards)
- `src/components/` - Reusable UI components
- `src/contexts/` - Auth context & global state
- `src/integrations/supabase/` - Supabase client setup
- `supabase/migrations/` - Database schema
- `supabase/functions/` - Serverless functions

## 🔧 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run test       # Run tests
npm run test:watch # Run tests in watch mode
```

## 🔐 Authentication

- Email/password signup and login via Supabase Auth
- Role-based access control (patient, doctor, admin)
- Protected routes with `ProtectedRoute` component
- Session persistence with JWT tokens

## 📚 Documentation

For detailed project information, see `ZENVIA_PROJECT_OVERVIEW.md`

## 🐛 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is proprietary software built by the ZENVIA team.

---

Built with ❤️ as a real healthcare startup.
For questions or support, reach out to the ZENVIA team.
