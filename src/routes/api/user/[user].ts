import type { EndpointOutput, Request } from '@sveltejs/kit';
import { fetchUser } from '../../../utils/api/last-fm';
import dotenv from 'dotenv';
dotenv.config();

interface Params {
  user: string
}

export async function get(
  request: Request<Params>
): Promise<EndpointOutput> {
  const { user } = request.params;
  const [ data, error ] = await fetchUser(user);

  if (error) {
    return {
      body: {
        isValid: false
      }
    }
  }

  return {
    body: {
      isValid: true,
      username: data?.name,
      avatar: data?.image[1]['#text'] // medium (64x64)
    }
  }
}