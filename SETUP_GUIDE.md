# AI Image Generator - Setup Guide

## 🚀 Quick Start (No API Keys Required)

The app works **immediately** without any API keys! It will generate placeholder images automatically.

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Start the Application

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm start
```

The app will work with placeholder images generated locally!

## 🎯 For Better Results (Optional Free APIs)

### Unsplash API (Recommended)
- **Free tier**: 5,000 requests/month
- **Get API key**: https://unsplash.com/developers
- **Add to server/.env**: `UNSPLASH_ACCESS_KEY=your_access_key_here`

### Pixabay API (Alternative)
- **Free tier**: 5,000 requests/day
- **Get API key**: https://pixabay.com/api/docs/
- **Add to server/.env**: `PIXABAY_API_KEY=your_api_key_here`

## 🔧 Environment Setup

Create `server/.env` file:

```env
# Database (required)
MONGODB_URL=your_mongodb_connection_string

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Free Image APIs (optional - for better results)
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
PIXABAY_API_KEY=your_pixabay_api_key
```

## 🎨 How It Works

1. **Primary**: Tries Unsplash API (if key provided)
2. **Secondary**: Tries Pixabay API (if key provided)
3. **Fallback**: Uses placeholder service
4. **Final**: Generates custom SVG with your prompt

## ❓ Common Issues

### "Image not available" error
- The app will automatically fall back to placeholder images
- Check console logs for detailed error messages
- Make sure your prompt is descriptive

### API rate limits
- Unsplash: 5,000 requests/month
- Pixabay: 5,000 requests/day
- The app automatically falls back if limits are reached

### No API keys needed
- The app works completely without any external APIs
- Placeholder images are generated locally
- Perfect for testing and development

## 🎯 Tips for Better Results

1. **Be specific**: "A serene mountain landscape at sunset" vs "mountain"
2. **Use descriptive words**: "golden", "majestic", "peaceful"
3. **Include style**: "digital art", "photorealistic", "watercolor"
4. **Add context**: "in the style of Van Gogh", "cyberpunk aesthetic"

## 🔍 Troubleshooting

### Backend won't start
```bash
cd server
npm install
npm start
```

### Frontend won't start
```bash
cd client
npm install
npm start
```

### Images not loading
- Check browser console for errors
- Verify the backend is running on port 5000
- Try refreshing the page

### API errors
- Check your API keys are correct
- Verify you haven't exceeded rate limits
- The app will automatically use fallbacks 