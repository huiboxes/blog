import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `http://blog.shdev.life:12996/api/posts?pagination[pageSize]=3&sort=publishedAt:DESC`,
      {
        method: 'GET'
      }
    );

    const recentlyPosts = await response.json();

    return res
      .status(200)
      .json({
        recentlyPosts: recentlyPosts.data.map((item) => item.attributes)
      });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
