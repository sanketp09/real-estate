const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public', 'frames');
const outputDir = path.join(__dirname, 'public', 'frames-compressed');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function compress() {
  console.log('Starting compression...');
  let totalSizeBefore = 0;
  let totalSizeAfter = 0;

  for (let i = 1; i <= 471; i++) {
    const filename = `frame_${String(i).padStart(3, '0')}.jpg`;
    const inPath = path.join(inputDir, filename);
    const outPath = path.join(outputDir, filename);
    
    if (fs.existsSync(inPath)) {
      const stats = fs.statSync(inPath);
      totalSizeBefore += stats.size;

      await sharp(inPath)
        .resize({ width: 1000, withoutEnlargement: true })
        .jpeg({ quality: 40, progressive: true, mozjpeg: true })
        .toFile(outPath);
        
      const outStats = fs.statSync(outPath);
      totalSizeAfter += outStats.size;

      if (i % 50 === 0) console.log(`Compressed ${i}/471 frames...`);
    }
  }
  console.log(`Finished! Size reduced from ${(totalSizeBefore/1024/1024).toFixed(2)}MB to ${(totalSizeAfter/1024/1024).toFixed(2)}MB.`);
}

compress().catch(console.error);
