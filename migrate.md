# 🚀 Migration Guide: GitLab + Google Cloud → GitHub + Vercel

> **What this guide does:** Moves your FormLLC Next.js app from GitLab (with Google Cloud App Engine) to GitHub (with Vercel). After this, every push to `main` auto-deploys on Vercel.

---

## Table of Contents

1. [Prerequisites (What You Need Before Starting)](#1-prerequisites)
2. [Phase 1 — Move Code to GitHub](#2-phase-1--move-code-to-github)
3. [Phase 2 — Set Up Vercel](#3-phase-2--set-up-vercel)
4. [Phase 3 — Environment Variables](#4-phase-3--environment-variables)
5. [Phase 4 — Code Changes (I'll Do This)](#5-phase-4--code-changes)
6. [Phase 5 — Database Migration](#6-phase-5--database-migration)
7. [Phase 6 — Google OAuth Update](#7-phase-6--google-oauth-update)
8. [Phase 7 — Stripe Webhook Update](#8-phase-7--stripe-webhook-update)
9. [Phase 8 — File Storage (Uploads)](#9-phase-8--file-storage-uploads)
10. [Phase 9 — DNS & Domain](#10-phase-9--dns--domain)
11. [Phase 10 — Testing & Go-Live](#11-phase-10--testing--go-live)
12. [Phase 11 — Cleanup](#12-phase-11--cleanup)
13. [Rollback Plan](#13-rollback-plan)
14. [Complete Environment Variables Checklist](#14-complete-environment-variables-checklist)
15. [Known Issues from Past Migrations](#15-known-issues-from-past-migrations)

---

## 1. Prerequisites

Before you start, gather these things. **Don't skip any!**

### Accounts You Need
- [ ] **GitHub account** — [github.com](https://github.com) (free works fine)
- [ ] **Vercel account** — [vercel.com](https://vercel.com) (sign up with your GitHub account, this makes life easier)
- [ ] **Access to your current GitLab repo** — you'll need to download the code
- [ ] **Access to Google Cloud Console** — to get your current database credentials
- [ ] **Stripe Dashboard access** — to update webhook URLs later
- [ ] **Domain registrar access** — wherever your domain DNS is managed (GoDaddy, Namecheap, Cloudflare, etc.)

### Information You Need to Collect
Grab these from your current setup **BEFORE** you start:

| What | Where to find it |
|------|-----------------|
| Database credentials (host, user, password, db name, port) | Google Cloud Console → SQL → Your instance |
| Google OAuth Client ID & Secret | Google Cloud Console → APIs & Services → Credentials |
| Stripe Secret Key & Webhook Secret | Stripe Dashboard → Developers → API Keys |
| SMTP credentials (host, user, pass) | Your email provider dashboard |
| All `.env` / `.env.local` values | Your current server or GitLab CI/CD variables |
| Your domain name | You know this one 😄 |

### Tools on Your Computer
- [ ] **Git** installed — run `git --version` in terminal to check
- [ ] **Node.js 18+** installed — run `node --version` to check
- [ ] **npm** installed — run `npm --version` to check

---

## 2. Phase 1 — Move Code to GitHub

### Step 1: Create a New GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it something like `formllc-next` (or whatever you prefer)
3. Set it to **Private**
4. **DO NOT** check "Add a README" or ".gitignore" — we already have those
5. Click **Create repository**
6. You'll see a page with instructions — **keep this page open**, you'll need the URL

### Step 2: Push Your Code to GitHub

Open your terminal and navigate to your project folder:

```bash
# Go to your project folder
cd /Users/abhishek/Desktop/Data/Build/formllc-next-main\ 4

# Check current git status
git status

# If not already a git repo, initialize it
git init

# Add the GitHub repo as a remote (replace URL with yours)
git remote add github https://github.com/YOUR_USERNAME/formllc-next.git

# If you already have a remote called 'origin' pointing to GitLab,
# you can rename it first:
git remote rename origin gitlab
git remote add origin https://github.com/YOUR_USERNAME/formllc-next.git

# Push everything to GitHub
git push -u origin main
```

> [!TIP]
> If your branch is called `master` instead of `main`, use `git push -u origin master` instead.

### Step 3: Verify on GitHub

1. Go to your new GitHub repo in the browser
2. Make sure all your files are there
3. Check that sensitive files like `.env` are **NOT** pushed (they should be in `.gitignore`)

---

## 3. Phase 2 — Set Up Vercel

### Step 1: Connect GitHub to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select **GitHub** and authorize Vercel if prompted
4. Find and select your `formllc-next` repo
5. Vercel will detect it's a Next.js project automatically

### Step 2: Configure the Project

On the configuration page:

| Setting | Value |
|---------|-------|
| Framework Preset | **Next.js** (auto-detected) |
| Root Directory | `./ ` (leave as default) |
| Build Command | `next build` |
| Output Directory | Leave blank (Vercel handles this) |
| Install Command | `npm install` |

> [!IMPORTANT]
> **DO NOT deploy yet!** We need to add environment variables first. Click **"Environment Variables"** section before deploying.

### Step 3: Add Environment Variables in Vercel

This is **critical**. Go to the Environment Variables section and add each one. See [Section 14](#14-complete-environment-variables-checklist) for the full list.

You can either:
- **Option A:** Add them one-by-one in the Vercel UI
- **Option B:** Use the Vercel CLI to bulk import (easier if you have many):

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Pull env vars from a file
# Create a .env file first, then:
vercel env pull
```

### Step 4: Deploy

Once all env vars are added:
1. Click **"Deploy"**
2. Watch the build logs
3. If it builds successfully, you'll get a `.vercel.app` URL

> [!WARNING]
> The first deploy will likely fail if environment variables are missing or wrong. That's normal! Check the build logs for errors and fix env vars accordingly.

---

## 4. Phase 3 — Environment Variables

Here's the **complete list** of environment variables your app uses. Set ALL of these in Vercel:

### Database (PostgreSQL)
```
DATABASE_NAME=your_db_name
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_HOST=your_db_host
DATABASE_PORT=5432

# Also used by the pg Pool config:
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
```

> [!CAUTION]
> Your app has TWO database configs — one in `src/config/database.ts` (uses `DB_*`) and one in `src/lib/sequelize.ts` (uses `DATABASE_*`). You need BOTH sets of variables, or I'll consolidate them for you in the code changes phase.

### Authentication
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=generate_a_random_secret_here
JWT_SECRET=your_jwt_secret
```

**To generate `NEXTAUTH_SECRET`**, run this in your terminal:
```bash
openssl rand -base64 32
```

### Payments (Stripe)
```
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
BASIC_PLAN_FEE_PRICEID=price_xxxxx
BASIC_PLAN_SUB_PRICEID=price_xxxxx
PRO_PLAN_FEE_PRICEID=price_xxxxx
PRO_PLAN_SUB_PRICEID=price_xxxxx
```

### Email (SMTP)
```
SMTP_HOST=smtp.your-provider.com
SMTP_USER=your_email@domain.com
SMTP_PASS=your_smtp_password
FROM_EMAIL=no-reply@yourdomain.com
REPLY_TO=support@yourdomain.com
SMTP_ENVELOPE_FROM=bounce@yourdomain.com
```

### Other
```
FRONTENDURL=https://your-domain.com
BASE_URL=https://your-domain.com
FORMLLC_API_KEY=your_formllc_api_key
NEXT_PUBLIC_GA_ID=GTM-XXXXXXX
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
```

---

## 5. Phase 4 — Code Changes (I'll Do This For You ✅)

These are changes I'll make to the codebase to make it Vercel-compatible. **You don't need to do anything here** — just tell me to proceed after we've set up the prerequisites.

### What I'll Change:

#### 1. Remove `distDir: 'build'` from `next.config.ts`
Vercel manages its own build output. The custom `distDir` conflicts with Vercel's build system.

#### 2. Remove the `deploy` script from `package.json`
The `"deploy": "npm run build && gcloud app deploy..."` script is Google Cloud–specific.

#### 3. Update `images.domains` in `next.config.ts`
Replace deprecated `domains` with the newer `remotePatterns` config and add your Vercel Blob domain (if using Vercel Blob for uploads).

#### 4. Consolidate database configs
Your app has two different database connection setups using different env var names. I'll unify them so you only need one set of env vars.

#### 5. Fix the upload route
The current upload route saves files to `./uploads` on disk. **This won't work on Vercel** because Vercel is serverless (no persistent filesystem). I'll migrate this to use **Vercel Blob** storage.

#### 6. Remove `.gitlab-ci.yml`
This file is no longer needed since Vercel handles CI/CD automatically.

#### 7. Remove `app.yaml` from `.gitignore`
The `app.yaml` reference in `.gitignore` is Google App Engine–specific.

#### 8. Remove `dotenv` config from `next.config.ts`
Vercel injects environment variables automatically — no need to manually call `dotenv.config()`.

---

## 6. Phase 5 — Database Migration

You have two options here:

### Option A: Keep Your Current Database (Easiest)
If your PostgreSQL database is accessible from the internet (not behind a VPC/firewall):
1. Just use the same database credentials in Vercel env vars
2. Make sure the database server allows connections from Vercel's IPs
3. **Done!**

> [!TIP]
> This is the fastest option. If your Google Cloud SQL instance has a public IP and allows external connections, just use the same host/credentials.

### Option B: Migrate to Vercel Postgres (Recommended for long-term)

1. Go to **Vercel Dashboard → Storage → Create Database**
2. Select **Postgres**
3. Click **Create**
4. Vercel will give you the connection details
5. Update your env vars with the new details

**To copy data from old DB to new:**

```bash
# Export from old database
pg_dump -h OLD_HOST -U OLD_USER -d OLD_DB_NAME > backup.sql

# Import to new database
psql -h NEW_HOST -U NEW_USER -d NEW_DB_NAME < backup.sql
```

> [!IMPORTANT]
> If you've already migrated your data to Vercel Postgres (from conversation history, it looks like you may have), you can skip this step entirely and just make sure the env vars point to the correct Vercel Postgres instance.

### Option C: Use a Managed Provider (Supabase, Neon, etc.)
If you want a dedicated managed PostgreSQL:
1. Sign up for [Neon](https://neon.tech) or [Supabase](https://supabase.com)
2. Create a new database
3. Run the `pg_dump`/`psql` commands above
4. Update env vars

---

## 7. Phase 6 — Google OAuth Update

When your domain changes, Google OAuth needs to know about the new URL.

### Step 1: Go to Google Cloud Console
1. Open [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services → Credentials**
3. Click on your **OAuth 2.0 Client ID**

### Step 2: Update Authorized URLs

Add these URLs (replace `your-domain.com` with your actual domain):

**Authorized JavaScript Origins:**
```
https://your-domain.com
https://your-app-name.vercel.app
```

**Authorized Redirect URIs:**
```
https://your-domain.com/api/auth/callback/google
https://your-app-name.vercel.app/api/auth/callback/google
```

> [!TIP]
> Add BOTH the `.vercel.app` URL AND your custom domain. This way, OAuth works on both URLs during testing.

### Step 3: Update `NEXTAUTH_URL`
In Vercel environment variables, set:
```
NEXTAUTH_URL=https://your-domain.com
```

---

## 8. Phase 7 — Stripe Webhook Update

Your Stripe webhooks currently point to your Google Cloud URL. You need to update them.

### Step 1: Go to Stripe Dashboard
1. Open [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Developers → Webhooks**

### Step 2: Add New Webhook Endpoint

1. Click **"Add endpoint"**
2. Set the URL to: `https://your-domain.com/api/webhook`
3. Select the same events your current webhook listens to
4. Click **"Add endpoint"**
5. Copy the new **Webhook Signing Secret** (starts with `whsec_`)
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel env vars

### Step 3: Keep Old Webhook Active (temporarily)
Don't delete the old webhook yet! Keep both active until you've verified everything works on Vercel.

---

## 9. Phase 8 — File Storage (Uploads)

Your current app saves uploads to a local `./uploads` folder. **This doesn't work on Vercel** because serverless functions don't have a persistent filesystem.

### Option A: Vercel Blob (Recommended)

1. Go to **Vercel Dashboard → Storage → Create**
2. Select **Blob**
3. Click **Create**
4. You'll get a `BLOB_READ_WRITE_TOKEN` — add this to your env vars

I'll handle the code changes to use Vercel Blob. You just need to:
- [ ] Create the Blob storage in Vercel Dashboard
- [ ] Copy the `BLOB_READ_WRITE_TOKEN` to env vars

### Option B: Keep Using Google Cloud Storage
If you want to keep files in Google Cloud Storage, you'd need to:
1. Set up a service account key
2. Add it as an env var
3. Use the GCS SDK

> This is more complex. Vercel Blob is simpler and recommended.

---

## 10. Phase 9 — DNS & Domain

### Step 1: Add Domain in Vercel
1. Go to your project in Vercel Dashboard
2. Click **Settings → Domains**
3. Type your domain (e.g., `formllc.io`) and click **Add**
4. Vercel will show you DNS records to add

### Step 2: Update DNS Records

Go to your domain registrar and update:

| Type | Name | Value |
|------|------|-------|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

> [!NOTE]
> The exact values will be shown in the Vercel dashboard. Use those values, not the ones above — they may differ.

### Step 3: Wait for Propagation
DNS changes can take 1–48 hours to propagate. Usually it's under 1 hour.

You can check propagation at [dnschecker.org](https://dnschecker.org)

### Step 4: SSL Certificate
Vercel automatically provisions SSL certificates. You don't need to do anything here. ✅

---

## 11. Phase 10 — Testing & Go-Live

### Pre-Launch Checklist

Test each of these on your Vercel deployment:

- [ ] **Homepage loads** — visit your `.vercel.app` URL
- [ ] **Google Login works** — click "Sign in with Google"
- [ ] **Email/Password Login works** — try signing in with credentials
- [ ] **Sign Up works** — create a new account
- [ ] **Forgot Password works** — try the forgot password flow
- [ ] **Dashboard loads** — after login, check the user dashboard
- [ ] **Admin panel works** — login as admin, verify all sections load
- [ ] **File uploads work** — try uploading a document
- [ ] **Payments work** — try a Stripe test payment (use test mode first!)
- [ ] **Emails are sent** — check that OTP/notification emails arrive
- [ ] **Contact form works** — submit the contact form
- [ ] **All pages load** — check pricing, privacy policy, terms, etc.
- [ ] **Mobile responsive** — check on your phone or DevTools mobile view

### Go-Live Steps

Once everything works:

1. **Switch `NEXTAUTH_URL`** to your custom domain (if not already)
2. **Point DNS** to Vercel (if not already)
3. **Update Stripe webhooks** to use your custom domain
4. **Update Google OAuth** authorized URIs to use your custom domain
5. **Disable Google App Engine** to stop paying for it
6. **Delete old Stripe webhook** after confirming new one works

---

## 12. Phase 11 — Cleanup

After everything is working on Vercel:

- [ ] **Delete `.gitlab-ci.yml`** from the repo
- [ ] **Remove `app.yaml`** references from `.gitignore`
- [ ] **Remove `"deploy"` script** from `package.json`
- [ ] **Remove `dotenv` import** from `next.config.ts`
- [ ] **Remove `distDir`** from `next.config.ts`
- [ ] **Disable Google App Engine** in Google Cloud Console
- [ ] **Archive GitLab repo** (don't delete yet, keep as backup)
- [ ] **Cancel/reduce Google Cloud billing** if no longer needed

---

## 13. Rollback Plan

If something goes wrong:

1. **DNS:** Point your domain back to Google Cloud (change DNS records back)
2. **GitLab CI:** Your old GitLab pipeline still works — just push to the old repo
3. **Database:** If you kept the old database, nothing to rollback
4. **Stripe:** Re-enable the old webhook endpoint

> [!TIP]
> Keep the old infrastructure running for at least 1-2 weeks after migration. This gives you a safety net.

---

## 14. Complete Environment Variables Checklist

Copy-paste this into Vercel. Replace values with your actual credentials:

```env
# ===== DATABASE =====
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=5432
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=

# ===== AUTH =====
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
JWT_SECRET=

# ===== STRIPE =====
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
BASIC_PLAN_FEE_PRICEID=
BASIC_PLAN_SUB_PRICEID=
PRO_PLAN_FEE_PRICEID=
PRO_PLAN_SUB_PRICEID=

# ===== EMAIL =====
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
FROM_EMAIL=
REPLY_TO=
SMTP_ENVELOPE_FROM=

# ===== OTHER =====
FRONTENDURL=
BASE_URL=
FORMLLC_API_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# ===== VERCEL BLOB (new, for file uploads) =====
BLOB_READ_WRITE_TOKEN=
```

---

## 15. Known Issues from Past Migrations

Based on patterns from previous work on this project:

### 🔴 Issue 1: Upload Failures on Vercel
**Problem:** The old upload route uses `formidable` to save files to local disk. Vercel is serverless — there's no persistent filesystem.
**Solution:** Migrate to Vercel Blob storage. I'll handle this in the code changes.

### 🔴 Issue 2: Vercel Body Size Limit
**Problem:** Vercel has a 4.5 MB request body limit on serverless functions. Large file uploads will fail.
**Solution:** Implement client-side compression before upload (already done in previous conversations for some routes).

### 🔴 Issue 3: Two Different Database Configs
**Problem:** `src/config/database.ts` uses `DB_*` env vars, `src/lib/sequelize.ts` uses `DATABASE_*` env vars. Easy to miss one set.
**Solution:** I'll consolidate these. For now, set BOTH sets of variables.

### 🟡 Issue 4: `distDir: 'build'` Conflicts with Vercel
**Problem:** Custom `distDir` in `next.config.ts` can cause build failures on Vercel.
**Solution:** Remove the `distDir` setting — Vercel uses `.next` by default.

### 🟡 Issue 5: NEXTAUTH_URL Must Match Exactly
**Problem:** If `NEXTAUTH_URL` doesn't match your actual domain (including `https://`), Google OAuth callbacks will fail silently.
**Solution:** Set it exactly: `https://yourdomain.com` (no trailing slash!)

### 🟡 Issue 6: Google OAuth Redirect URI Mismatch
**Problem:** Google OAuth redirect URIs must include your NEW Vercel URL. Without this, "Sign in with Google" will show an error.
**Solution:** Add both `.vercel.app` URL and custom domain to Google OAuth authorized redirect URIs.

### 🟢 Issue 7: Stripe Webhook Secret Changes
**Problem:** New webhook endpoint = new webhook secret. If you use the old secret, webhook verification will fail silently.
**Solution:** Create a new webhook in Stripe and use the new secret.

### 🟢 Issue 8: `dotenv` Not Needed on Vercel
**Problem:** `dotenv.config()` in `next.config.ts` is unnecessary on Vercel and can cause subtle issues.
**Solution:** Remove it — Vercel injects env vars automatically.

---

## ⏱️ Estimated Timeline

| Phase | Time | Who |
|-------|------|-----|
| Prerequisites gathering | 30 min | You |
| Move code to GitHub | 10 min | You |
| Set up Vercel | 15 min | You |
| Environment variables | 20 min | You |
| Code changes | 15 min | Me (AI) |
| Database migration | 10-30 min | You (if needed) |
| Google OAuth update | 10 min | You |
| Stripe webhook update | 10 min | You |
| File storage setup | 10 min | You + Me |
| DNS & domain | 10 min | You |
| Testing | 30 min | You |
| **Total** | **~2-3 hours** | |

---

## 🎯 What To Do Right Now

1. **Read through this entire guide** so you know what's coming
2. **Gather all prerequisites** from Section 1
3. **Start with Phase 1** (Move Code to GitHub)
4. **Come back to me** when you're ready for the code changes (Phase 4) or if you get stuck anywhere!

> **I'm here to help at every step. Just tell me where you are and I'll guide you through it! 🙌**
<!-- Trigger Vercel Deployment: 2026-02-13 -->
