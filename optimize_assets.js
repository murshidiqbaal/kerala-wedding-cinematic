import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = './src/assets';
const OUTPUT_DIR = './src/assets/optimized';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImages(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'optimized' && file !== 'frames') {
        await optimizeImages(fullPath);
      }
      continue;
    }

    if (/\.(jpe?g|png)$/i.test(file)) {
      const outputName = file.replace(/\.(jpe?g|png)$/i, '.webp');
      const outputPath = path.join(OUTPUT_DIR, outputName);
      console.log(`Converting ${file} to WebP...`);
      await sharp(fullPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
    }
  }
}

async function optimizeVideo() {
  const videoDir = path.join(ASSETS_DIR, 'video');
  const files = fs.readdirSync(videoDir);
  for (const file of files) {
    if (file.endsWith('.mp4')) {
      const fullPath = path.join(videoDir, file);
      const outputWebm = path.join(OUTPUT_DIR, file.replace('.mp4', '.webm'));
      console.log(`Converting ${file} to WebM...`);
      try {
        execSync(`"${ffmpeg}" -i "${fullPath}" -c:v libvpx-vp9 -crf 30 -b:v 0 -an "${outputWebm}"`, { stdio: 'inherit' });
      } catch (e) {
        console.error(`Failed to convert ${file} to WebM`, e);
      }
    }
  }
}

async function optimizeAudio() {
  const videoDir = path.join(ASSETS_DIR, 'video');
  const files = fs.readdirSync(videoDir);
  for (const file of files) {
    if (file.endsWith('.mp3')) {
      const fullPath = path.join(videoDir, file);
      const outputMp3 = path.join(OUTPUT_DIR, 'bg_music.mp3');
      console.log(`Optimizing ${file}...`);
      try {
        // Normalize and reduce bitrate to 128k
        execSync(`"${ffmpeg}" -i "${fullPath}" -codec:a libmp3lame -b:a 128k "${outputMp3}"`, { stdio: 'inherit' });
      } catch (e) {
        console.error(`Failed to optimize ${file}`, e);
      }
    }
  }
}

async function run() {
  console.log('Starting optimization...');
  await optimizeImages(ASSETS_DIR);
  await optimizeVideo();
  await optimizeAudio();
  console.log('Optimization complete. Files are in src/assets/optimized');
}

run().catch(console.error);
