# AI Image Generator - Backend

This backend provides free image generation using multiple fallback services.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory with the following variables:

```env
# Database Configuration
MONGODB_URL=your_mongodb_connection_string

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Free Image Generation APIs (Optional - for better results)
# Get free API keys from:
# Unsplash: https://unsplash.com/developers (5000 requests/month free)
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# Pixabay: https://pixabay.com/api/docs/ (5000 requests/day free)
PIXABAY_API_KEY=your_pixabay_api_key
```

## Image Generation Services

The app uses multiple fallback services in order of preference:

1. **Unsplash API** - High-quality stock photos (requires API key)
2. **Pixabay API** - Free stock photos (requires API key)
3. **Placeholder Service** - Simple placeholder images (no API key needed)
4. **Custom SVG** - Generated locally (always works)

## Getting Free API Keys

### Unsplash API
1. Go to https://unsplash.com/developers
2. Create a free account
3. Create a new application
4. Get your Access Key
5. Add it to your `.env` file as `UNSPLASH_ACCESS_KEY`

### Pixabay API
1. Go to https://pixabay.com/api/docs/
2. Sign up for a free account
3. Get your API key
4. Add it to your `.env` file as `PIXABAY_API_KEY`

## Running the Server

```bash
npm start
```

The server will run on port 5000 by default.

## Features

- ✅ Free image generation with multiple fallback services
- ✅ No API key required for basic functionality
- ✅ Better results with optional free API keys
- ✅ Robust error handling
- ✅ Automatic fallback to placeholder images
- ✅ Base64 image encoding for frontend compatibility 