import puppeteer from 'puppeteer';
import fetch from 'cross-fetch';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });

  const body = await request.json();
  const resp = await fetch('http://localhost:3000/api/render', {
    method: 'post',
    body: JSON.stringify(body)
  });
  const data = await resp.text();

  const page = await browser.newPage();
  await page.setViewport({
    width: 1080,
    height: 1080
  });
  await page.setContent(data);
  const image = await page.screenshot();
  await browser.close();
  return {
    headers: { 'Content-Type': 'image/png' },
    body: image
  }
}