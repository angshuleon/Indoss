import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Read the generated index.html
const htmlPath = './build/client/index.html';
let html = readFileSync(htmlPath, 'utf-8');

// Find the CSS file in build/client/assets/
const assetsDir = './build/client/assets';
const files = readdirSync(assetsDir);
const cssFile = files.find(f => f.startsWith('app-') && f.endsWith('.css'));

if (cssFile) {
  // Inject CSS link into <head>
  const cssLink = `<link rel="stylesheet" href="/assets/${cssFile}"/>`;
  html = html.replace('</title>', `</title>${cssLink}`);

  writeFileSync(htmlPath, html);
  console.log(`✅ Injected CSS link: /assets/${cssFile}`);
} else {
  console.error('❌ CSS file not found in assets folder');
  process.exit(1);
}
