# 🎉 START HERE - Complete Setup Guide

Welcome to Memento! Follow these 3 steps to get your app live with your custom domain.

## 📋 What You Have

A complete, production-ready event invitation platform:
- ✨ Beautiful event invitations
- 📋 RSVP management dashboard
- 🎁 Wishlist coordination
- 🔗 Shareable links
- 💾 Real Supabase database

## 🎯 The Plan (30 minutes total)

**Step 1: Supabase Setup (5 min)**  
Create your database

**Step 2: Local Testing (5 min)**  
Make sure it works locally

**Step 3: GitHub & Deploy (20 min)**  
Push to GitHub Pages with your custom domain

---

## ✅ Step 1: Supabase Setup (5 minutes)

### 1.1 Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Click "Start your project"
- Create account and new project
- Wait 2 minutes for setup

### 1.2 Get Your Credentials
- Click **Project Settings** (⚙️ bottom left)
- Click **API** tab
- Copy **Project URL**
- Copy **Anon/Public Key**
- Save these somewhere safe!

### 1.3 Create Database Tables
- In Supabase, click **SQL Editor**
- Click **New Query**
- Copy entire SQL from `SUPABASE_SETUP.md` (in this folder)
- Paste into SQL editor
- Click **Run**
- You should see "Success" ✅

**Supabase is ready!**

---

## ✅ Step 2: Local Testing (5 minutes)

### 2.1 Install & Configure
```bash
# Install dependencies
npm install

# Copy example env file
cp .env.example .env.local

# Edit .env.local and paste your Supabase credentials
# VITE_SUPABASE_URL=paste_your_url_here
# VITE_SUPABASE_ANON_KEY=paste_your_key_here
```

### 2.2 Run Locally
```bash
npm run dev
```

- Opens at `http://localhost:3000`
- Try signing up with an email
- Create an event
- Copy the invitation link
- Open in incognito window and RSVP as guest
- See response in dashboard

**If it works → Continue to Step 3!**

---

## ✅ Step 3: GitHub & Deploy (20 minutes)

### 3.1 Create GitHub Repository
- Go to [github.com](https://github.com)
- Click **+** → **New repository**
- Name it: `memento`
- Make it **Public**
- Click **Create repository**

### 3.2 Push Your Code
```bash
git init
git add .
git commit -m "Initial commit - Memento app"
git remote add origin https://github.com/YOUR_USERNAME/memento.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 3.3 Add GitHub Secrets
These let GitHub deploy your site safely without exposing secrets.

1. Go to your GitHub repo
2. Click **Settings** (top right)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret**
5. Add first secret:
   - Name: `VITE_SUPABASE_URL`
   - Value: (paste your Supabase Project URL)
   - Click **Add secret**
6. Add second secret:
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: (paste your Supabase Anon Key)
   - Click **Add secret**

### 3.4 Enable GitHub Pages
1. In your repo, go to **Settings**
2. Click **Pages** (left sidebar)
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** and **/root** folder
4. Click **Save**
5. Wait 1 minute then refresh
6. You'll see: "Your site is live at https://YOUR_USERNAME.github.io/memento"

### 3.5 Custom Domain (Important!)
To use your custom domain:

1. In `.github/workflows/deploy.yml`, find this line:
   ```yaml
   cname: yourdomain.com
   ```
   Change `yourdomain.com` to your actual domain

2. At your domain registrar (GoDaddy, Namecheap, etc.):
   - Go to DNS settings
   - Add CNAME record:
     - Host: `@` (or leave blank)
     - Value: `YOUR_USERNAME.github.io`
     - TTL: 3600 or default
     - Save

3. In GitHub repo Settings → Pages:
   - Custom domain: `yourdomain.com`
   - Save
   - Check "Enforce HTTPS"

4. Commit and push:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add custom domain"
   git push
   ```

**Wait 24 hours for DNS to propagate. Then your site is live at your custom domain!**

### 3.6 Check Deployment Status
- Go to **Actions** tab in GitHub
- You should see "Deploy to GitHub Pages" running
- Wait 1-2 minutes
- Once done, your site is live! 🎉

---

## 🎉 You're Done!

Your Memento is now live! Here's what to do next:

### Test Your Site
1. Visit your domain (or GitHub Pages URL)
2. Sign up with an email
3. Create an event
4. Copy the invitation link
5. Open in incognito → RSVP as guest
6. See your response in the dashboard

### Make Changes
Every time you push to GitHub, it auto-deploys:
```bash
# Make changes
# ... edit code ...

# Commit
git add .
git commit -m "Your change"

# Push
git push

# Auto-deployed in 1-2 minutes! 🚀
```

### Need More Info?
- `README.md` - Overview
- `SUPABASE_SETUP.md` - Database details
- `GITHUB_SETUP.md` - Deployment details
- `QUICKSTART.md` - Quick reference

---

## 🆘 Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org
- Restart terminal
- Try again

### "Supabase: Auth error"
- Verify `.env.local` has correct URL and key
- Restart dev server: `npm run dev`

### "GitHub deployment failed"
- Check **Actions** tab for error details
- Usually missing GitHub Secrets
- Verify both secrets are added correctly

### "Site shows 404"
- GitHub Pages takes ~5 minutes first time
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- Check that `gh-pages` branch exists

### "Custom domain not working"
- DNS changes take 24 hours
- Verify CNAME record in your registrar
- Make sure `.github/workflows/deploy.yml` has correct domain

---

## 📊 Project Structure

```
memento/
├── memento-app.jsx          ← Main app component
├── package.json             ← Dependencies
├── .env.example             ← Template
├── .env.local               ← Your secrets (git ignored)
├── .github/
│   └── workflows/deploy.yml ← Auto-deploy config
├── README.md                ← Full documentation
├── SUPABASE_SETUP.md        ← Database setup
├── GITHUB_SETUP.md          ← Deployment details
├── QUICKSTART.md            ← Quick reference
└── START_HERE.md            ← This file
```

---

## 🚀 Features You Have

**Hosts:**
- Sign up & login
- Create beautiful event invitations
- 3 themes to choose from
- Get shareable links
- View live RSVP dashboard
- Track dietary needs, +1s, messages
- Manage wishlist

**Guests:**
- No login required
- See beautiful invitation
- RSVP Yes/Maybe/No
- Add dietary requirements
- Bring guests (+1)
- Send message to host
- View & reserve wishlist items

---

## 💡 Next Steps

1. ✅ Follow the 3 steps above
2. ✅ Test on your custom domain
3. ✅ Share invitation links with people
4. ✅ Collect RSVPs
5. 💰 (Optional) Add payments later

---

## 🎊 Congratulations!

You now have a production-ready event management platform live on the internet!

Share your creation, enjoy the RSVPs, and celebrate! 🎉

---

**Questions?** Check the README, SUPABASE_SETUP, or GITHUB_SETUP docs in this folder.

**Ready to launch?** Start with Step 1 above! 🚀
