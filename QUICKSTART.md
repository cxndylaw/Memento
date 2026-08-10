# ⚡ 5-Minute Quick Start

The fastest way to get Memento running.

## 1️⃣ Supabase (2 minutes)

```
1. Go to supabase.com → Create project
2. Copy Project URL & Anon Key
3. SQL Editor → Paste SQL from SUPABASE_SETUP.md → Run
4. Done!
```

## 2️⃣ Local Setup (2 minutes)

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your Supabase keys
npm run dev
```

Visit `http://localhost:3000` ✅

## 3️⃣ GitHub Deploy (1 minute)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOU/memento.git
git push -u origin main
```

Then in GitHub:
- Settings → Secrets → Add `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`
- Settings → Pages → Enable GitHub Pages
- Done! Auto-deploys on every push

## 📖 Full Guides

- `README.md` - Overview
- `SUPABASE_SETUP.md` - Detailed database setup
- `GITHUB_SETUP.md` - Detailed deployment setup

## 🎉 You're Live!

Your site is at:
- `https://YOUR_USERNAME.github.io/memento`
- Or your custom domain (see GITHUB_SETUP.md)

Test it:
1. Sign up
2. Create event
3. Copy link
4. RSVP as guest
5. See responses

Done! 🚀
