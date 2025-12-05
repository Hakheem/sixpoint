// check-exports.js
const fs = require('fs');
const path = require('path');

const modulePath = path.join(__dirname, 'node_modules', 'better-auth', 'dist', 'client', 'react', 'index.mjs');

try {
  const content = fs.readFileSync(modulePath, 'utf8');
  console.log('File size:', content.length, 'bytes');
  
  // Look for export statements
  console.log('\n=== Looking for exports ===');
  const lines = content.split('\n');
  let inExportBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('export')) {
      console.log(`Line ${i + 1}: ${line.substring(0, 100)}...`);
    }
    
    // Look for export { ... } blocks
    if (line.includes('export {') || line.includes('export{')) {
      console.log(`Line ${i + 1}: ${line}`);
      inExportBlock = true;
    } else if (inExportBlock && line.includes('}')) {
      console.log(`Line ${i + 1}: ${line}`);
      inExportBlock = false;
    }
  }
  
} catch (error) {
  console.error('Error:', error.message);
}

