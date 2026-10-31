const sharp = require('sharp');
const path = require('path');

async function processPhoto() {
  const inputPath = path.join(__dirname, '../public/profile.jpg');
  const outputPath = path.join(__dirname, '../public/profile-editorial.png');
  const webpOutputPath = path.join(__dirname, '../public/profile-editorial.webp');

  const { width, height } = await sharp(inputPath).metadata();
  console.log(`Original dimensions: ${width}x${height}`);

  // Create an alpha mask buffer
  const maskBuffer = Buffer.alloc(width * height);

  for (let y = 0; y < height; y++) {
    const yPct = y / height;
    let alphaY = 1.0;

    // Bottom fade: deep editorial dissolve like Makro starting below the collar
    if (yPct > 0.62) {
      if (yPct >= 0.94) {
        alphaY = 0.0;
      } else {
        const t = (yPct - 0.62) / (0.94 - 0.62);
        // Smooth sine ease
        alphaY = 0.5 * (1 + Math.cos(Math.PI * t));
      }
    }

    for (let x = 0; x < width; x++) {
      const xPct = x / width;
      let alphaX = 1.0;

      // Left edge feathering (dissolve towards headline text)
      if (xPct < 0.16) {
        const t = xPct / 0.16;
        alphaX = 0.5 * (1 - Math.cos(Math.PI * t));
      }
      // Right edge feathering (gentle edge dissolve)
      else if (xPct > 0.94) {
        const t = (xPct - 0.94) / (1.0 - 0.94);
        alphaX = 0.5 * (1 + Math.cos(Math.PI * t));
      }

      const totalAlpha = Math.min(255, Math.max(0, Math.round(alphaY * alphaX * 255)));
      maskBuffer[y * width + x] = totalAlpha;
    }
  }

  // Load image with alpha channel
  const withAlpha = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rawPixels = withAlpha.data;
  
  // Page background is #ebeff5: R=235, G=239, B=245
  // Original photo background is R~205, G~212, B~222
  for (let i = 0; i < width * height; i++) {
    let r = rawPixels[i * 4];
    let g = rawPixels[i * 4 + 1];
    let b = rawPixels[i * 4 + 2];
    const alphaVal = maskBuffer[i];

    // Detect light studio backdrop pixels (grey-blue background around head and shoulders)
    // Dark hair is r<90, dark t-shirt is r<80, skin has r-g > 25 (warmth)
    const isStudioBackdrop = (r > 155 && g > 165 && b > 175) && (Math.abs(r - g) < 22 && Math.abs(g - b) < 22);
    if (isStudioBackdrop) {
      // Blend 80% towards #ebeff5 (235, 239, 245) for an exact match to the website background
      const factor = 0.82;
      r = Math.round(r * (1 - factor) + 235 * factor);
      g = Math.round(g * (1 - factor) + 239 * factor);
      b = Math.round(b * (1 - factor) + 245 * factor);
      rawPixels[i * 4] = r;
      rawPixels[i * 4 + 1] = g;
      rawPixels[i * 4 + 2] = b;
    }

    rawPixels[i * 4 + 3] = alphaVal;
  }

  // Save optimized PNG
  await sharp(rawPixels, {
    raw: { width, height, channels: 4 }
  })
  .png({ quality: 95, compressionLevel: 8 })
  .toFile(outputPath);

  // Save WebP for ultra-fast performance
  await sharp(rawPixels, {
    raw: { width, height, channels: 4 }
  })
  .webp({ quality: 94, effort: 6 })
  .toFile(webpOutputPath);

  console.log('Successfully generated updated profile-editorial.webp');
}

processPhoto().catch(err => console.error(err));
