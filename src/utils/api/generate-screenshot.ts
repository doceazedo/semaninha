import puppeteer from 'puppeteer';
import type { Ratio } from '../../enums';
import { sizes } from '../../helpers';

const generateScreenshot = async (html: string, ratio: Ratio): Promise<string | Buffer> => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport(sizes[ratio]);
  await page.setContent(html);
  const image = await page.screenshot();
  await browser.close();
  return image;
}

export default generateScreenshot;