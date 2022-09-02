import { postSlugsQuery } from 'lib/queries';
import fetcher from 'lib/fetcher';
import { Post } from 'lib/types'


const createSitemap = (slugs) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
          .map((slug) => {
            return `
                <url>
                    <loc>${`https://shdev.life/${slug}`}</loc>
                </url>
            `;
          })
          .join('')}
    </urlset>
`;
export async function getServerSideProps({ res }) {
  
  const { data } = await fetcher(`http://blog.shdev.life:12996/api/posts?populate[0]=categories&populate[1]=coverImage`)
  // console.log(data)
  const allPosts: Post[] = data.map(item => item.attributes)

  const allPages = [
    ...allPosts.map((slug) => `blog/${slug}`),
    ...[
      '',
      'about',
      'blog',
      'dashboard',
      'guestbook',
      'newsletter'
    ]
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(createSitemap(allPages));
  res.end();

  return {
    props: {}
  };
}

export default function Sitemap() {
  return null;
}
