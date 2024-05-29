import puppeteer from 'puppeteer';

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto('https://google.com', { waitUntil: 'networkidle2' });

    const text = "All eyes on Rafah";

    await page.type(".gLFyf", text);
    await page.keyboard.press('Enter');

    await page.waitForSelector('a[jsname="UWckNb"]', { timeout: 60000 });

    const links = await page.evaluate(() => {
      const elements = document.querySelectorAll('a[jsname="UWckNb"]');
      return Array.from(elements).map(element => {
        const h3 = element.querySelector('h3');

        return {
          headline: h3.innerText,
          href: element.href,
        };
      });
    });

    console.log(links);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

run();