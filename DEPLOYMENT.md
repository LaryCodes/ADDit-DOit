# Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Configure Vercel Project
1. Go to your Vercel project settings
2. Navigate to **Settings** → **General**
3. Find **Root Directory** section
4. Click **Edit**
5. Enter: `frontend`
6. Click **Save**

### Step 2: Set Environment Variables
In Vercel → **Settings** → **Environment Variables**, add:
- `NEXT_PUBLIC_API_URL` = Your Railway backend URL (e.g., `https://your-app.up.railway.app`)

### Step 3: Redeploy
- Go to **Deployments** tab
- Click the three dots on the latest deployment
- Click **Redeploy**

## Backend Deployment (Railway)

### Step 1: Configure Railway Service
1. Click on your **ADDit-DOit** service (not the database)
2. Go to **Settings** tab
3. Find **Source** or **Root Directory** section
4. Set to: `backend`
5. Save

### Step 2: Add PostgreSQL Database
1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically set `DATABASE_URL` environment variable

### Step 3: Set Environment Variables
In Railway → **Variables** tab, add:

```
BETTER_AUTH_SECRET=-YL6sBrsxUWFmrp2sI-jjCoV0OKCpm-ptaAcsZLmuRTU
FRONTEND_URL=https://your-app.vercel.app
ENVIRONMENT=production
OPENAI_API_KEY=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
GEMINI_API_KEY=AIzaSyAA9wOjtPSgNzmAv0CXr9x3NlBFXBdvZeA
AGENT_MODEL=gpt-4o-mini
AGENT_TEMPERATURE=0.7
AGENT_MAX_TOKENS=1000
```

### Step 4: Redeploy
Railway should auto-deploy after setting root directory and environment variables.

## Troubleshooting

### Vercel: "Module not found" errors
- **Cause**: Root directory not set to `frontend`
- **Fix**: Set root directory in Vercel settings to `frontend`

### Railway: "Error creating build plan"
- **Cause**: Root directory not set to `backend`
- **Fix**: Set root directory in Railway settings to `backend`

### Railway: "pip: command not found"
- **Cause**: Python environment not detected
- **Fix**: Ensure `backend/requirements.txt` exists and root directory is set correctly
