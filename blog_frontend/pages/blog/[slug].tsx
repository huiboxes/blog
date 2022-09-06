import { MDXRemote } from 'next-mdx-remote';
import BlogLayout from 'layouts/blog';
import components from 'components/MDXComponents';
import { postQuery, postSlugsQuery } from 'lib/queries';
import { mdxToHtml } from 'lib/mdx';
import { Post } from 'lib/types';

import fetcher from 'lib/fetcher';

export default function PostPage({ post }: { post: Post }) {
  // const StaticTweet = ({ id }) => {
  //   const tweet = post.tweets.find((tweet) => tweet.id === id);
  //   return <Tweet {...tweet} />;
  // };

  return (
    <BlogLayout post={post}>
      <MDXRemote
        {...post.content}
        components={
          {
            ...components
          } as any
        }
      />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  // const paths = await sanityClient.fetch(postSlugsQuery);
  const { data } = await fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  const paths = Array.from(data[0]?.attributes).map((item: any) => item.slug);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params, preview = false }) {
  // const { post } = await getClient(preview).fetch(postQuery, {
  //   slug: params.slug
  // });

  const { data } = await fetcher(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?populate[0]=coverImage&filters[slug][$eq]=${params.slug}`
  );
  const post = data[0]?.attributes;

  if (!post) {
    return { notFound: true };
  }

  post.coverImage = post?.coverImage?.data?.attributes?.url
    ? post?.coverImage?.data?.attributes?.url
    : 'https://via.placeholder.com/1080';

  const { html, readingTime } = await mdxToHtml(post.content);

  return {
    props: {
      post: {
        ...post,
        content: html,
        readingTime
      }
    }
  };
}
