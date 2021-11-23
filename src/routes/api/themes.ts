import type { EndpointOutput } from '@sveltejs/kit';
import * as themes from '../../themes';

export async function get(): Promise<EndpointOutput> {
  
  return {
    body: Object.values(themes)
  }
}