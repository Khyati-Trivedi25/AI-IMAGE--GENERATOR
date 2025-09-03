import fetch from "node-fetch";

console.log("🌐 Testing network connectivity...");

async function testNetwork() {
  try {
    console.log("🔍 Testing basic fetch...");
    
    // Test 1: Simple HTTP request
    const response1 = await fetch("https://httpbin.org/get");
    console.log("✅ Basic fetch test:", response1.status);
    
    // Test 2: JSON response
    const data1 = await response1.json();
    console.log("✅ JSON parsing test:", typeof data1);
    
    // Test 3: Image fetch
    console.log("🔍 Testing image fetch...");
    const response2 = await fetch("https://via.placeholder.com/100x100");
    console.log("✅ Image fetch test:", response2.status);
    
    // Test 4: Convert to base64
    const imageBuffer = await response2.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');
    console.log("✅ Base64 conversion test, length:", base64.length);
    
    console.log("🎉 All network tests passed!");
    
  } catch (error) {
    console.error("❌ Network test failed:", error.message);
    console.error("❌ Full error:", error);
    
    // Check Node.js version
    console.log("📋 Node.js version:", process.version);
    console.log("📋 Platform:", process.platform);
    
    // Suggest solutions
    console.log("\n💡 Possible solutions:");
    console.log("1. Check your internet connection");
    console.log("2. Try running: npm install");
    console.log("3. Make sure you're using Node.js 18+ or have node-fetch installed");
  }
}

testNetwork(); 