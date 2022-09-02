import RSS from 'rss';
import { indexQuery } from 'lib/queries';
import fetcher from 'lib/fetcher';
import { Post } from 'lib/types'

export async function getServerSideProps({ res }) {
  const feed = new RSS({
    title: 'Xieshaohui',
    site_url: 'https://shdev.life',
    feed_url: 'https://shdev.life/feed.xml'
  });


  const { data } = await fetcher(`http://blog.shdev.life:12996/api/posts?populate[0]=categories&populate[1]=coverImage`)
  // console.log(data)
  const allPosts: Post[] = data.map(item => item.attributes)



  allPosts.map((post) => {
    feed.item({
      title: post.title,
      url: `https://shdev.life/blog/${post.slug}`,
      date: post.publishedAt,
      description: post.excerpt
    });
  });

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {}
  };
}

export default function RSSFeed() {
  return null;
}
