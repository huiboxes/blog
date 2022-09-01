import { Suspense, useState } from 'react';

import Container from 'components/Container';
import BlogPost from 'components/BlogPost';
import { InferGetStaticPropsType } from 'next';
import { indexQuery } from 'lib/queries';
import { getClient } from 'lib/sanity-server';
import { Post } from 'lib/types';

import useSWR from 'swr';
import fetcher from 'lib/fetcher';

export default function Blog({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState('');

  const filteredBlogPosts = Array.from(posts).filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Container
      title="Blog – 谢少辉"
      description="Thoughts on the software industry, programming, tech, videography, music, and my personal life."
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          文章
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
        &emsp;&emsp;{`记录学习和生活，主要是关于软件开发学习经历。我在博客上总共写了 ${posts.length} 篇文章。使用下面的搜索按标题过滤。`}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="搜索文章"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="搜索文章"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {!searchValue && (
          <>
            <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
              最受欢迎
            </h3>
            <BlogPost
              title="Oracle数据库基础"
              excerpt="非常强大的商业数据库，通过本文快速学习上手这款数据库吧。默认端口：1521。与MySQL不同的是......"
              slug="basic-knowledge-of-oracle"
            />
          </>
        )}
        <Suspense fallback={null}>
          <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            All Posts
          </h3>
          {!filteredBlogPosts.length && (
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              No posts found.
            </p>
          )}
          {filteredBlogPosts.map((post) => (
            <BlogPost
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
            />
          ))}
        </Suspense>
      </div>
    </Container>
  );
}

export async function getStaticProps({ preview = false }) {
  
  // const { data } = useSWR<MyPost[]>(`http://blog.shdev.life:12996/api/posts?populate[0]=categories&populate[1]=cover`, fetcher);
  // console.log(data)

  const { data } = await fetcher(`http://blog.shdev.life:12996/api/posts?populate[0]=categories&populate[1]=coverImage`)
  // console.log(data)
  const posts: Post[] = data.map(item => item.attributes)

  posts.forEach(item => item.coverImage.data ? item.coverImage = item.coverImage.data.attributes.url : item)

  // const posts: Post[] = await getClient(preview).fetch(indexQuery);
  return { props: { posts } };
}
