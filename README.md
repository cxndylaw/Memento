# 🎉 Memento - Beautiful Event Invitations & Guest Management

A complete, production-ready event invitation platform with RSVP management, wishlist coordination, and guest tracking.

## ✨ Features

- 🔐 User authentication (sign up / login)
- 📋 Create beautiful customizable event invitations
- 🎨 Multiple invitation themes (Minimal, Party, Elegant)
- 🔗 Shareable invitation links
- 📊 Live RSVP dashboard for hosts
- 🎁 Wishlist management (guests can reserve gifts)
- 👥 Guest tracking (dietary needs, +1s, messages)
- 📱 Fully responsive design
- ⚡ Real-time updates with Supabase

## 🚀 Quick Start (5 Minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up (free tier)
3. Create new project
4. Go to SQL Editor
5. Copy and paste the SQL from `SUPABASE_SETUP.md`
6. Copy your Project URL and Anon Key

### Step 2: Setup Locally
```bash
# Install dependencies
npm install

# Create .env.local from .env.example
cp .env.example .env.local

# Edit .env.local with your Supabase keys
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_ANON_KEY=your_key

# Start dev server
npm run dev
```

Visit `http://localhost:3000` and test it out!

### Step 3: Deploy to GitHub Pages
1. Push to GitHub
2. Add GitHub Secrets (Settings → Secrets):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Enable GitHub Pages (Settings → Pages → gh-pages branch)
4. Update `.github/workflows/deploy.yml` with your domain
5. Commit & push - auto-deploys!

## 📁 Project Structure

```
memento/
├── memento-app.jsx          # Main React component (full app)
├── index.html               # HTML entry point
├── main.jsx                 # React mount point
├── index.css                # Tailwind styles
├── vite.config.js           # Build config
├── tailwind.config.js       # Tailwind config
├── postcss.config.js        # PostCSS config
├── package.json             # Dependencies
├── .env.example             # Environment template
├── .env.local               # Your environment (git ignored)
├── .gitignore               # Ignored files
├── .github/
│   └── workflows/
│       └── deploy.yml       # Auto-deploy workflow
├── README.md                # This file
├── SUPABASE_SETUP.md        # Database setup guide
├── GITHUB_SETUP.md          # GitHub Pages setup guide
└── QUICKSTART.md            # Quick start guide
```

## 🔧 Tech Stack

- **Frontend**: React 18 + Tailwind CSS + Vite
- **Backend**: Supabase (PostgreSQL + Auth)
- **Hosting**: GitHub Pages
- **Icons**: Lucide React

## 📚 Documentation

- `SUPABASE_SETUP.md` - Complete database setup with SQL
- `GITHUB_SETUP.md` - GitHub Pages & custom domain setup
- `QUICKSTART.md` - Fast overview

## 🎯 Features Breakdown

### Hosts Can:
✅ Sign up & login  
✅ Create events with customization  
✅ Choose invitation themes  
✅ Get shareable links  
✅ View live RSVP dashboard  
✅ Track dietary needs & +1s  
✅ Read guest messages  
✅ Manage wishlist  
✅ Copy invitation link  

### Guests Can:
✅ Open invitation (no login)  
✅ See beautiful invitation  
✅ RSVP Yes/Maybe/No  
✅ Add dietary requirements  
✅ Bring +1 guests  
✅ Send message to host  
✅ View & reserve wishlist items  

## 🌐 Deployment

### GitHub Pages (Recommended)
```bash
# Build for production
npm run build

# GitHub Actions auto-deploys on every push
# See .github/workflows/deploy.yml
```

### Custom Domain
1. Update `.github/workflows/deploy.yml`:
   ```yaml
   cname: yourdomain.com
   ```
2. Point DNS to GitHub Pages
3. Commit & push

## 🔐 Security

- ✅ Supabase Auth (JWT tokens)
- ✅ Row Level Security (RLS) ready
- ✅ Environment variables for secrets
- ✅ HTTPS on GitHub Pages
- ✅ Secure API calls

## 💾 Environment Variables

### `.env.local` (Local Development)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### GitHub Secrets (For Deployment)
Add in repo Settings → Secrets:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Database Schema

The app creates these tables in Supabase:
- `users` - User accounts
- `events` - Events created by hosts
- `rsvps` - Guest responses
- `wishlist_items` - Gift wishlist items

See `SUPABASE_SETUP.md` for full schema.

## 🚦 Getting Help

- **Supabase Docs**: https://supabase.com/docs
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com
- **Vite Docs**: https://vitejs.dev

## 📝 Next Steps

1. ✅ Set up Supabase
2. ✅ Setup locally & test
3. ✅ Push to GitHub
4. ✅ Add GitHub Secrets
5. ✅ Deploy to GitHub Pages
6. ✅ Configure custom domain
7. 🎉 Share with users!

## 💡 Future Features

- 📸 Photo galleries
- 💰 Group gifting
- 📧 Email reminders
- 🗓️ Calendar integration
- 🎵 Music on invitations
- 💳 Payments & premium tiers

## 📄 License

Open source - use freely!

---

**Ready to launch? Start with `SUPABASE_SETUP.md`** 🚀
# Memento
