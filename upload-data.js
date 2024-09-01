const dotenv = require('dotenv');
const fs = require('fs').promises;
const path = require('path');

// Load environment variables from .env.development.local
dotenv.config({ path: '.env.development.local' });

let kv;
try {
  const vercelKV = require('@vercel/kv');
  if (vercelKV && typeof vercelKV.kv === 'object' && vercelKV.kv.set) {
    kv = vercelKV.kv;
    console.log('Successfully imported @vercel/kv');
  } else {
    console.log('Imported @vercel/kv, but it does not have the expected structure');
    console.log('Vercel KV object:', vercelKV);
  }
} catch (error) {
  console.error('Error importing @vercel/kv:', error.message);
}

if (!kv) {
  console.log('Proceeding without Vercel KV. Data will be logged but not uploaded.');
}

async function uploadData() {
  const dataDirectory = path.join(process.cwd(), 'data');

  try {
    const files = await fs.readdir(dataDirectory);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(dataDirectory, file);
        const data = await fs.readFile(filePath, 'utf8');
        const collection = file.replace('.json', '');
        const parsedData = JSON.parse(data);
        
        if (kv && typeof kv.set === 'function') {
          try {
            await kv.set(collection, parsedData);
            console.log(`Uploaded ${file} to Vercel KV`);
          } catch (error) {
            console.error(`Error uploading ${file} to Vercel KV:`, error.message);
          }
        } else {
          console.log(`Would upload to Vercel KV (if available):`, {
            collection,
            dataLength: JSON.stringify(parsedData).length
          });
        }
      }
    }
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

uploadData();