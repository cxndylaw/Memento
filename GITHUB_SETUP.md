# 🚀 GitHub Pages Deployment Setup

Complete guide to deploy Memento to GitHub Pages with your custom domain.

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **+** (top right) → **New repository**
3. Name: `memento` (or your project name)
4. Description: "Beautiful event invitations & guest management"
5. Public or Private (both work)
6. **Create repository**

## Step 2: Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Memento app"

# Add GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/memento.git

# Push to main branch
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Add GitHub Secrets

GitHub needs your Supabase credentials to deploy. Keep them secret!

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

Done! Your secrets are now safe in GitHub.

## Step 4: Enable GitHub Pages

1. In your repo, go to **Settings** (top right)
2. Click **Pages** (left sidebar under "Code and automation")
3. Under "Build and deployment":
   - Source: Select **Deploy from a branch**
   - Branch: Select **gh-pages** and **/root** folder
   - Click **Save**
4. Wait a minute, then refresh
5. You should see: "Your site is live at https://YOUR_USERNAME.github.io/memento"

## Step 5: Setup Custom Domain (Optional but Recommended)

### If you have a custom domain:

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find DNS settings
3. Add **CNAME** record:
   - Host/Name: `@` or leave blank
   - Value/Target: `YOUR_USERNAME.github.io`
   - TTL: 3600 or default
   - **Save**

4. Back in GitHub repo Settings → Pages:
   - Under "Custom domain", enter: `yourdomain.com`
   - Click **Save**
   - Check "Enforce HTTPS"

5. Update `.github/workflows/deploy.yml`:
   - Change line: `cname: yourdomain.com`
   - Commit & push

Wait 24 hours for DNS to propagate. Your site will be live at your domain!

### If you don't have a custom domain:

No problem! Your site is already live at:
```
https://YOUR_USERNAME.github.io/memento
```

You can skip the DNS setup and use this URL.

## Step 6: First Deployment

The workflow automatically runs when you push to `main`:

1. In your repo, go to **Actions** tab
2. You should see "Deploy to GitHub Pages" workflow running
3. Wait 1-2 minutes for build & deploy
4. Once done, your site is live!

To deploy again in future, just commit & push to main:
```bash
git add .
git commit -m "Update features"
git push
```

Automatic deploy happens every time! 🎉

## Step 7: Test Your Site

1. Visit your GitHub Pages URL:
   - `https://YOUR_USERNAME.github.io/memento` (or your custom domain)
2. Try signing up
3. Create an event
4. Copy invitation link
5. Open in incognito window → RSVP as guest
6. See responses in dashboard

If it works → You're deployed! 🚀

## Common Issues

### "Actions workflow failed"
- Check **Actions** tab to see error
- Usually missing environment secrets
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are in Secrets

### "Site not showing up"
- Wait 5 minutes (GitHub Pages can be slow)
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- Check Pages settings (Settings → Pages)
- Verify branch is set to `gh-pages`

### "Custom domain not working"
- DNS changes can take 24 hours
- Verify CNAME record in domain registrar
- Try clearing DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### "404 on invitation links"
- This is normal if accessed without `?invitation=slug`
- Invitation links only work with query parameter
- Full URL should be: `yourdomain.com?invitation=event-slug`

## Make Changes

To update your site:

```bash
# Make changes to code
# e.g., edit memento-app.jsx

# Commit
git add .
git commit -m "Update invitation theme"

# Push
git push

# GitHub Actions auto-deploys!
# Check Actions tab to see progress
# Live in ~1-2 minutes
```

## Monitor Deployments

1. Go to **Actions** tab in your repo
2. Click "Deploy to GitHub Pages" workflow
3. See all deployments and their status
4. Click any deployment to see detailed logs

## Secrets Security

⚠️ **IMPORTANT:**
- Never commit `.env.local` (it's in `.gitignore`)
- Never paste secrets in code
- Only store in GitHub Secrets
- Secrets are encrypted & never visible in logs

## Next Steps

✅ Code pushed to GitHub  
✅ Secrets added  
✅ GitHub Pages enabled  
✅ Custom domain configured (optional)  
✅ Site deployed!

Your Memento is now live! 🎉

---

**Share your site** with anyone and start collecting RSVPs!
