import type { EndpointOutput } from '@sveltejs/kit';
import * as themes from '../../themes';
import dotenv from 'dotenv';
dotenv.config();

export async function get(): Promise<EndpointOutput> {
  let themesList = Object.values(themes);
  if (process.env.NODE_ENV != 'development') {
    themesList = themesList.filter(theme => theme.slug != 'dummy');
  }
  
  return {
    body: Object.values(themesList)
  }
}