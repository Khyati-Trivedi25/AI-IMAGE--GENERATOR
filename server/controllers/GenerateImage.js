import * as dotenv from "dotenv";
import { createError } from "../error.js";
import fetch from "node-fetch";

dotenv.config();

// Free image generation using multiple fallback services
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    console.log("🎨 Generating image for prompt:", prompt);

    // Try multiple free services in order of preference
    const services = [
      tryUnsplashAPI,
      tryPixabayAPI,
      tryPlaceholderAPI,
      generatePlaceholderImage
    ];

    for (const service of services) {
      try {
        console.log(`🔄 Trying service: ${service.name}`);
        const result = await service(prompt);
        if (result) {
          console.log(`✅ Success with ${service.name}`);
          // Ensure proper base64 format
          const base64Data = result.startsWith('data:') ? result : `data:image/jpeg;base64,${result}`;
          return res.status(200).json({ photo: base64Data });
        }
      } catch (error) {
        console.log(`❌ Service failed: ${service.name}`, error.message);
        continue;
      }
    }

    // If all services fail, generate a placeholder
    console.log("🔄 Generating fallback placeholder");
    const placeholder = await generatePlaceholderImage(prompt);
    const base64Data = placeholder.startsWith('data:') ? placeholder : `data:image/svg+xml;base64,${placeholder}`;
    res.status(200).json({ photo: base64Data });

  } catch (error) {
    console.error("❌ Image Generation Error:", error.message);
    next(createError(500, "Image generation service is currently unavailable"));
  }
};

// Try Unsplash API (free tier available)
const tryUnsplashAPI = async (prompt) => {
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
  
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error("No Unsplash API key");
  }

  console.log("🔍 Searching Unsplash for:", prompt);

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&per_page=1&orientation=landscape`,
      {
        method: "GET",
        headers: {
          "Authorization": `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("📡 Unsplash API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Unsplash API error response:", errorText);
      throw new Error(`Unsplash API failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("📊 Unsplash API response data:", JSON.stringify(data, null, 2));
    
    if (!data.results || data.results.length === 0) {
      throw new Error("No results from Unsplash");
    }

    const imageUrl = data.results[0].urls.regular;
    console.log("📸 Found Unsplash image:", imageUrl);
    
    // Fetch the actual image
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image from Unsplash: ${imageResponse.status}`);
    }
    
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');
    console.log("✅ Unsplash image converted to base64, length:", base64.length);
    
    // Validate base64 length (should be much longer for a real image)
    if (base64.length < 1000) {
      throw new Error("Image data too short, likely an error response");
    }
    
    return base64;
  } catch (error) {
    console.error("❌ Unsplash API error:", error.message);
    throw error;
  }
};

// Try Pixabay API (free tier available)
const tryPixabayAPI = async (prompt) => {
  const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
  
  if (!PIXABAY_API_KEY) {
    throw new Error("No Pixabay API key");
  }

  console.log("🔍 Searching Pixabay for:", prompt);

  const response = await fetch(
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(prompt)}&image_type=photo&per_page=1&orientation=horizontal`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Pixabay API error:", errorText);
    throw new Error(`Pixabay API failed: ${response.status}`);
  }

  const data = await response.json();
  
  if (!data.hits || data.hits.length === 0) {
    throw new Error("No results from Pixabay");
  }

  const imageUrl = data.hits[0].webformatURL;
  console.log("📸 Found Pixabay image:", imageUrl);
  
  const imageResponse = await fetch(imageUrl);
  
  if (!imageResponse.ok) {
    throw new Error("Failed to fetch image from Pixabay");
  }
  
  const imageBuffer = await imageResponse.arrayBuffer();
  const base64 = Buffer.from(imageBuffer).toString('base64');
  console.log("✅ Pixabay image converted to base64, length:", base64.length);
  return base64;
};

// Try a placeholder image service
const tryPlaceholderAPI = async (prompt) => {
  try {
    console.log("🔍 Using placeholder service for:", prompt);
    // Use a placeholder image service that generates images based on text
    const keywords = prompt.split(' ').slice(0, 3).join('+');
    const imageUrl = `https://via.placeholder.com/512x512/4A90E2/FFFFFF?text=${encodeURIComponent(keywords)}`;
    
    console.log("📸 Placeholder URL:", imageUrl);
    
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      throw new Error("Placeholder service failed");
    }
    
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');
    console.log("✅ Placeholder image converted to base64, length:", base64.length);
    
    // Validate base64 length
    if (base64.length < 1000) {
      throw new Error("Placeholder image data too short");
    }
    
    return base64;
  } catch (error) {
    console.error("❌ Placeholder service error:", error.message);
    throw new Error("Placeholder service unavailable");
  }
};

// Generate a custom SVG placeholder (always works)
const generatePlaceholderImage = async (prompt) => {
  console.log("🎨 Generating custom SVG placeholder for:", prompt);
  const words = prompt.split(' ').slice(0, 4);
  const displayText = words.join(' ');
  
  // Create a more robust SVG with better styling
  const svgContent = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.3"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <circle cx="256" cy="180" r="80" fill="rgba(255,255,255,0.15)" filter="url(#shadow)"/>
      <circle cx="256" cy="180" r="60" fill="rgba(255,255,255,0.1)"/>
      <text x="50%" y="300" font-family="Arial, sans-serif" font-size="20" 
            font-weight="bold" text-anchor="middle" fill="white" dominant-baseline="middle"
            filter="url(#shadow)">
        ${displayText.substring(0, 25)}${displayText.length > 25 ? '...' : ''}
      </text>
      <text x="50%" y="330" font-family="Arial, sans-serif" font-size="16" 
            text-anchor="middle" fill="rgba(255,255,255,0.9)" dominant-baseline="middle">
        AI Generated Image
      </text>
      <text x="50%" y="360" font-family="Arial, sans-serif" font-size="12" 
            text-anchor="middle" fill="rgba(255,255,255,0.7)" dominant-baseline="middle">
        Generated locally
      </text>
    </svg>
  `;
  
  const base64 = Buffer.from(svgContent).toString('base64');
  console.log("✅ Custom SVG generated, length:", base64.length);
  return base64;
};
