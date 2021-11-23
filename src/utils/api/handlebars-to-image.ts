import { promises as fs } from 'fs';
import handlebars from 'handlebars';
import generateScreenshot from './generate-screenshot';

const handlebarsToImage = async (templateName: string, params): Promise<any> => {
  const template = (await fs.readFile(`src/templates/${templateName}.handlebars`)).toString();
  const compile = handlebars.compile(template);
  const image = await generateScreenshot(compile(params), params.ratio);

  return {
    headers: { 'Content-Type': 'image/png' },
    body: image
  }
}

export default handlebarsToImage;