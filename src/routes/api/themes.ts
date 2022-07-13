import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import matter from 'gray-matter';
import type { RequestHandler } from '@sveltejs/kit';

const themesPath = path.resolve(process.cwd(), 'src/lib/themes');
const themeFiles = fs.readdirSync(themesPath);
const themes = themeFiles.map((fileName) => {
  const ext = fileName.split('.').pop();
  if (ext != 'svelte') return null;

  const filePath = path.resolve(themesPath, fileName);
  const content = matter.read(filePath, { delimiters: ['<!--', '-->']});
  return {
    slug: fileName.replace(/\.[^/.]+$/, ''),
    ...content.data
  };
}).filter(x => !!x);

export const get: RequestHandler = () => {
   

  // if (process.env.NODE_ENV != 'development') {
  //   themesList = themesList.filter(theme => theme.slug != 'dummy');
  // }
  
  return {
    body: {
      themes
    }
  }
}