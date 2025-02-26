const { Ablo } = require('./ablo-ts-sdk');  // Adjust path as needed
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to download an image from a URL
async function downloadImage(url, filename) {
  const outputPath = path.join(outputDir, filename);
  const writer = fs.createWriteStream(outputPath);
  
  console.log(`Downloading image to ${outputPath}`);
  
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });
    
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Successfully saved image to ${outputPath}`);
        resolve(outputPath);
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading image: ${error.message}`);
    throw error;
  }
}

// Function to retry API calls
async function retryApiCall(apiFunction, maxRetries = 3, delay = 2000) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries}...`);
      return await apiFunction();
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);
      lastError = error;
      
      if (attempt < maxRetries) {
        console.log(`Waiting ${delay/1000} seconds before retrying...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 1.5; // Increase delay for next attempt
      }
    }
  }
  
  throw lastError;
}

async function generateGoldenGateImages() {
  try {
    // Initialize the ABLO client with your API key
    const apiKey = '196d15cd0f7170949827af25d0388ff0006fff4d286e562c492b4d2bf7e26deb';
    const ablo = new Ablo(apiKey);
    
    // Get available styles
    console.log('Fetching available styles...');
    const styles = await ablo.styles.getAll();
    
    console.log('Available styles:');
    styles.forEach(style => {
      console.log(`- ${style.name}: ${style.id}`);
    });
    
    // Use Kidult style since it worked previously
    const kidultStyle = styles.find(style => style.name === 'Kidult');
    const styleId = kidultStyle ? kidultStyle.id : styles[0].id;
    console.log(`Using style: ${styleId}`);
    
    // Generate unobstructed view of Golden Gate Bridge with more detailed prompt
    const unobstructedPrompt = "The famous red Golden Gate Bridge in San Francisco with a clear view, no buildings blocking the view, sunny day";
    console.log('Generating unobstructed view of Golden Gate Bridge...');
    
    // Use the retry function for image generation
    const unobstructedResult = await retryApiCall(
      () => ablo.imageMaker.run({
        styleId: styleId,
        freeText: unobstructedPrompt,
        width: 512,
        height: 512
      })
    );
    
    if (unobstructedResult && unobstructedResult.images && unobstructedResult.images.length > 0) {
      const imageUrl = unobstructedResult.images[0].url;
      await downloadImage(imageUrl, 'golden_gate_unobstructed.png');
      console.log('Unobstructed view saved successfully');
    } else {
      console.log('Failed to generate unobstructed view');
    }
    
    // Generate obstructed view of Golden Gate Bridge with more explicit prompt
    const obstructedPrompt = "A very tall skyscraper in the foreground completely blocks most of the Golden Gate Bridge in San Francisco. You can barely see the red bridge behind the building, just a small part of the top is visible.";
    console.log('Generating obstructed view of Golden Gate Bridge...');
    
    const obstructedResult = await retryApiCall(
      () => ablo.imageMaker.run({
        styleId: styleId,
        freeText: obstructedPrompt,
        width: 512,
        height: 512
      })
    );
    
    if (obstructedResult && obstructedResult.images && obstructedResult.images.length > 0) {
      const imageUrl = obstructedResult.images[0].url;
      await downloadImage(imageUrl, 'golden_gate_obstructed.png');
      console.log('Obstructed view saved successfully');
    } else {
      console.log('Failed to generate obstructed view');
    }
    
    console.log('Image generation complete!');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the function
generateGoldenGateImages();