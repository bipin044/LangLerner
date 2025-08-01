# 🚀 LinguaLink Deployment Guide

This guide will help you deploy both the frontend and backend of LinguaLink.

## 📋 Prerequisites

- GitHub account with your LinguaLink repository
- MongoDB Atlas account (for database)
- Stream account (for chat/video features)
- Vercel account (for frontend)
- Render account (for backend)

## 🌐 Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your `LangLerner` repository
5. Configure build settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `streamify-video-calls-master`
   - **Build Command:** `cd frontend && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `cd frontend && npm install`

### Step 2: Set Environment Variables
In Vercel dashboard → Settings → Environment Variables:
- `VITE_STREAM_API_KEY`: Your Stream API key

### Step 3: Deploy
Click "Deploy" and wait for completion.

**Frontend URL:** `https://your-project.vercel.app`

## 🔧 Backend Deployment (Render)

### Step 1: Deploy to Render
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your `LangLerner` repository
5. Configure settings:
   - **Name:** `lingualink-backend`
   - **Root Directory:** `streamify-video-calls-master/backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Step 2: Set Environment Variables
In Render dashboard → Environment:
- `NODE_ENV`: `production`
- `PORT`: `10000`
- `MONGO_URI`: Your MongoDB connection string
- `STEAM_API_KEY`: Your Stream API key
- `STEAM_API_SECRET`: Your Stream API secret
- `JWT_SECRET_KEY`: Your JWT secret (generate a strong one)

### Step 3: Deploy
Click "Create Web Service" and wait for deployment.

**Backend URL:** `https://lingualink-backend.onrender.com`

## 🔗 Connect Frontend to Backend

### Update CORS in Backend
The backend is already configured to allow requests from:
- `http://localhost:5173` (development)
- `https://your-project.vercel.app` (production)

### Update Frontend API Calls
The frontend is already configured to use relative URLs in production, so it will automatically work with your deployed backend.

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string

### Step 2: Configure Database
1. Create a database user
2. Get your connection string
3. Add it to Render environment variables as `MONGO_URI`

## 🎥 Stream Setup

### Step 1: Create Stream Account
1. Go to [getstream.io](https://getstream.io)
2. Create a free account
3. Create a new app
4. Get your API key and secret

### Step 2: Configure Stream
1. Add API key to Vercel environment variables
2. Add API key and secret to Render environment variables

## ✅ Testing Your Deployment

### Frontend Test
1. Visit your Vercel URL
2. Try to sign up/login
3. Test the main features

### Backend Test
1. Visit `https://your-backend-url.onrender.com/api/health`
2. Should return: `{"status":"OK","message":"LinguaLink Backend is running!"}`

### Full Stack Test
1. Try to register a new user
2. Test friend requests
3. Test chat functionality

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Check that your frontend URL is in the allowed origins
   - Verify environment variables are set correctly

2. **Database Connection:**
   - Check MongoDB Atlas network access
   - Verify connection string format

3. **Build Failures:**
   - Check build logs in Vercel/Render
   - Verify all dependencies are in package.json

4. **Environment Variables:**
   - Double-check all variables are set correctly
   - Restart services after changing variables

## 📞 Support

If you encounter issues:
1. Check the deployment logs
2. Verify all environment variables
3. Test locally first
4. Check the console for errors

## 🎉 Success!

Once deployed, your LinguaLink application will be live at:
- **Frontend:** `https://your-project.vercel.app`
- **Backend:** `https://lingualink-backend.onrender.com`

Share your language learning platform with the world! 🌍✨ 