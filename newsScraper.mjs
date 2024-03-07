import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import imageSize from 'image-size';
import { fileURLToPath } from 'url';

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Centralize command-line arguments
const [url, category = 'Cat', subcategoryArg] = process.argv.slice(2);
const subcategory = subcategoryArg ? `-${subcategoryArg}` : 'Sub';

const downloadImage = async (url, folderPath, identifier, category, subcategory) => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const baseUrl = url.split('?')[0];
    const extension = path.extname(baseUrl).toLowerCase();
  
    const tempPath = path.join(folderPath, `${identifier}.tmp`);
    fs.writeFileSync(tempPath, buffer);

    const dimensions = imageSize(tempPath);
    const size = `${dimensions.width}x${dimensions.height}`;

    const fileName = `${category}${subcategory}_${identifier}-${size}${extension}`;
    const finalPath = path.join(folderPath, fileName);

    fs.renameSync(tempPath, finalPath);
    return finalPath;
  } catch (error) {
    console.error(`Error downloading image: ${error}`);
  }
};

async function downloadVideoThumbnails(page, folderPath, category, subcategory) {
  const videoIDs = await page.evaluate(() => {
    const iframes = Array.from(document.querySelectorAll('.embedded-video iframe'));
    return iframes
      .map(iframe => {
        const src = iframe.src;
        const match = src.match(/youtube\.com\/embed\/([\w-]+)/);
        return match ? match[1] : null;
      })
      .filter(id => id); // Filter out null values
  });

  // Download thumbnails for each video ID
  await Promise.all(
    videoIDs.map((id, index) => {
      const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      // Construct the identifier including "_Video-Thumbnail"
      const identifier = `${index + 1}`;
      return downloadImage(thumbnailUrl, folderPath, identifier, category, `${subcategory}_Video-Thumbnail`);
    })
  );
}

async function extractAndDownloadImages(url, category, subcategory) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 890 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Specify images to ignore
    const ignoreList = ['/logo.png'];

    // Extract standard and masthead images, excluding ignored ones
    const images = await page.evaluate(ignoreList => {
      return Array.from(document.images, img => ignoreList.some(ignoreItem => img.src.includes(ignoreItem)) ? '' : img.src)
        .filter(src => src);
    }, ignoreList);

    const mastheadImages = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.active'))
        .map(el => window.getComputedStyle(el).backgroundImage.match(/url\("?(.+?)"?\)/)?.[1])
        .filter(url => url);
    });

    const folderPath = path.join(__dirname, 'downloaded_images');
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });

    // Download images
    await Promise.all([
      ...images.map((imgUrl, i) => downloadImage(imgUrl, folderPath, `Image_${i + 1}-Thumbnail`, category, subcategory)),
      ...mastheadImages.map((imgUrl, i) => downloadImage(imgUrl, folderPath, `Image_${i + 1}_Masthead`, category, subcategory))
    ]);    

    // Call the video thumbnail download function
    await downloadVideoThumbnails(page, folderPath, category, subcategory);

    await browser.close();
  } catch (error) {
    console.error(`Error extracting or downloading images: ${error}`);
  }
}

if (!url) {
    console.log('Please provide a URL as an argument.');
    process.exit(1);
} else {
    extractAndDownloadImages(url, category, subcategory).catch(console.error);
}