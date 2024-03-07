const puppeteer = require('puppeteer');

const USERNAME_SELECTOR = '#edit-name';
const PASSWORD_SELECTOR = '#edit-pass';
const LOGIN_BUTTON_SELECTOR = '#edit-submit';
const LOGIN_URL = '';

async function login(page) {
    await page.goto(LOGIN_URL, { waitUntil: 'networkidle2' });
    await page.type(USERNAME_SELECTOR, '');
    await page.type(PASSWORD_SELECTOR, '');
    await page.click(LOGIN_BUTTON_SELECTOR);
    await page.waitForNavigation();
}

async function scrapeNodeNumbers(urls) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Login first
    await login(page);

    const urlNodePairs = [];
    for (let url of urls) {
        try {
            await page.goto(url, { waitUntil: 'networkidle2' });
            await page.waitForSelector('a[href*="/edit"]', { timeout: 5000 });
            const nodeNumber = await page.evaluate(() => {
                // Find the anchor element with class 'is-active' that contains the node path
                const activeLink = document.querySelector('a.is-active[data-drupal-link-system-path*="node/"]');
                if (activeLink) {
                    // Extract the node number from the 'data-drupal-link-system-path' attribute
                    const nodePathMatch = activeLink.getAttribute('data-drupal-link-system-path').match(/node\/(\d+)/);
                    return nodePathMatch ? nodePathMatch[1] : null;
                }
                return null;
            });
            
            if (nodeNumber) {
                console.log(`Found node number ${nodeNumber} for URL: ${url}`);
                urlNodePairs.push([url, `node/${nodeNumber}`]);
            } else {
                console.log(`No node number found for URL: ${url}`);
            }
        } catch (error) {
            console.error(`Error processing URL ${url}: ${error.message}`);
        }
    }

    await browser.close();
    return urlNodePairs;
}

const urls = [
];

scrapeNodeNumbers(urls).then(urlNodePairs => {
    console.log('URL and Node pairs:', urlNodePairs);
});