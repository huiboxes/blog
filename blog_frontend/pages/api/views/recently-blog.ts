import { type NextRequest } from 'next/server';
import { Post } from 'lib/types';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  const response = await fetch(
    `http://blog.shdev.life:12996/api/posts?pagination[pageSize]=3&sort=publishedAt:DESC`,
    {
      method: 'GET'
    }
  );
  

  const recentlyPosts = await response.json();
  
  // console.log(recentlyPosts.data)
  return new Response(
    JSON.stringify({
      recentlyPosts: recentlyPosts.data.map(item => item.attributes)
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600'
      }
    }
  );
}
