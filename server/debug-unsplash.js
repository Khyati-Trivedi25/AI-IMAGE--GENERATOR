import * as dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

console.log("🔍 Testing Unsplash API...");
console.log("API Key present:", !!UNSPLASH_ACCESS_KEY);
console.log("API Key length:", UNSPLASH_ACCESS_KEY ? UNSPLASH_ACCESS_KEY.length : 0);

if (!UNSPLASH_ACCESS_KEY) {
  console.log("❌ No Unsplash API key found in .env file");
  console.log("💡 Add UNSPLASH_ACCESS_KEY=your_key_here to your .env file");
  process.exit(1);
}

async function testUnsplash() {
  try {
    const prompt = "mountain landscape";
    console.log("🔍 Testing with prompt:", prompt);
    
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

    console.log("📡 Response status:", response.status);
    console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      return;
    }

    const data = await response.json();
    console.log("✅ API Response:", JSON.stringify(data, null, 2));
    
    if (data.results && data.results.length > 0) {
      const imageUrl = data.results[0].urls.regular;
      console.log("📸 Image URL:", imageUrl);
      
      // Test fetching the image
      const imageResponse = await fetch(imageUrl);
      console.log("📸 Image fetch status:", imageResponse.status);
      
      if (imageResponse.ok) {
        const imageBuffer = await imageResponse.arrayBuffer();
        const base64 = Buffer.from(imageBuffer).toString('base64');
        console.log("✅ Image converted to base64, length:", base64.length);
        console.log("✅ First 100 chars:", base64.substring(0, 100));
      }
    }
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    console.error("❌ Full error:", error);
  }
}

testUnsplash(); 