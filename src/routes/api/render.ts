import type { RequestHandler } from "@sveltejs/kit";

// export const get: RequestHandler = () => ({ status: 501 });

export const post: RequestHandler = async ({ request }) => {
  const data = await request.json();
  return {
    body: {
      data
    }
  }
}
