<h1 align="center">🌍 LinguaLink - Where Languages Connect, Cultures Unite 🌍</h1>

![LinguaLink Demo](/frontend/public/screenshot-for-readme.png)

## ✨ About LinguaLink

LinguaLink is a modern, culturally-aware language learning platform that connects learners with native speakers worldwide. Our mission is to make language learning authentic, engaging, and meaningful through real human connections.

## 🚀 Key Features

- 🌐 **Global Language Exchange** - Connect with native speakers from 120+ countries
- 📹 **High-Quality Video Calls** - Crystal clear 1-on-1 and group conversations
- 💬 **Real-time Messaging** - Chat with typing indicators, reactions, and voice messages
- 🎯 **Smart Matching** - AI-powered partner recommendations based on learning goals
- 📊 **Learning Analytics** - Track your progress with detailed insights and achievements
- 🏆 **Gamified Learning** - Earn badges, maintain streaks, and celebrate milestones
- 🌍 **Cultural Exchange** - Learn languages through authentic cultural experiences
- 📱 **Mobile-First Design** - Beautiful, responsive interface for all devices

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite + TailwindCSS + DaisyUI
- **Backend:** Node.js + Express + MongoDB
- **Real-time:** Stream Chat & Video API
- **State Management:** Zustand + TanStack Query
- **Authentication:** JWT + Protected Routes
- **Styling:** Custom Design System with LinguaLink Brand Colors

## 🎨 Design Philosophy

LinguaLink features a modern, minimalist design with:
- **Deep Ocean Blue (#1E3A8A)** - Trust, stability, global connection
- **Warm Coral (#FF6B6B)** - Energy, friendliness, cultural diversity  
- **Soft Mint (#4ADE80)** - Growth, learning, progress
- **Clean Typography** - Inter, Source Sans Pro, and Poppins fonts
- **Smooth Animations** - Subtle micro-interactions and transitions

## 🧪 Environment Setup

### Backend (`/backend`)

```env
PORT=5001
MONGO_URI=your_mongo_uri
STEAM_API_KEY=your_steam_api_key
STEAM_API_SECRET=your_steam_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
```

### Frontend (`/frontend`)

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

## 🔧 Installation & Setup

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project root:**
   ```bash
   vercel
   ```

4. **Set Environment Variables:**
   - Go to your Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add `VITE_STREAM_API_KEY` with your Stream API key

5. **Configure Build Settings:**
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `cd frontend && npm install`

### Alternative: Deploy to Netlify

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Drag and drop the `dist` folder to Netlify**

3. **Set environment variables in Netlify dashboard**

## 🌟 What Makes LinguaLink Special

- **Cultural Intelligence** - Built-in cultural context and sensitivity
- **Learning Analytics** - Detailed progress tracking and insights
- **Community Features** - Group learning and cultural events
- **Accessibility** - Inclusive design for all users
- **Gamification** - Engaging learning through achievements and challenges

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines and join our community of language learners and developers.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**LinguaLink** - Making language learning human, authentic, and meaningful. 🌍✨
