import { Suspense } from 'react';
import Image from 'next/future/image';
import Link from 'next/link';

import useSWR from 'swr';
import fetcher from 'lib/fetcher';
import { Post } from 'lib/types';

import Container from '../components/Container';
import BlogPostCard from '../components/BlogPostCard';
import Subscribe from '../components/Subscribe';
import VideoCard from '../components/VideoCard';

export default function Home() {
  let recentlyPosts;
  const { data } = useSWR<any>(`/api/views/recently-blog`, fetcher);
  recentlyPosts = data?.recentlyPosts;

  return (
    <Suspense fallback={null}>
      <Container>
        <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <div className="flex flex-col-reverse sm:flex-row items-start">
            <div className="flex flex-col pr-8">
              <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
                谢少辉
              </h1>
              <h2 className="text-gray-700 dark:text-gray-200 mb-4">
                软件工程专业 <span className="font-semibold">学生</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-16">
                喜欢使用脚本语言为生活带来便利。喜欢拥有良好交互体验的应用软件，并总尝试自己实现。热爱游戏，正在学习
                Three.js、Unreal Engine 等 3D 相关技术。
              </p>
            </div>
            <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
              <Image
                alt="Xieshaohui"
                height={176}
                width={176}
                src="/avatar.png"
                sizes="30vw"
                priority
                className="rounded-full filter"
              />
            </div>
          </div>

          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
            最近文章
          </h3>
          {recentlyPosts || '内容正在加载中......'}
          {recentlyPosts && (
            <div className="flex gap-6 flex-col md:flex-row">
              <BlogPostCard
                title={recentlyPosts[0].title}
                slug={recentlyPosts[0].slug}
                gradient="from-[#D8B4FE] to-[#818CF8]"
              />
              <BlogPostCard
                title={recentlyPosts[1].title}
                slug={recentlyPosts[1].slug}
                gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
              />
              <BlogPostCard
                title={recentlyPosts[2].title}
                slug={recentlyPosts[2].slug}
                gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
              />
            </div>
          )}

          <Link href="/blog">
            <a className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
              查看所有文章
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 ml-1"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                />
              </svg>
            </a>
          </Link>

          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-16 text-black dark:text-white">
            我的视频
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            我在BiliBili上的一些视频。
          </p>
          <VideoCard
            index="01"
            href="/#"
            length="00:00:00"
            title="敬请期待"
            onClick={(e) => e.preventDefault()}
          />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/#"
            onClick={(e) => e.preventDefault()}
            className="flex mt-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
          >
            查看所有视频
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 ml-1"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
              />
            </svg>
          </a>
          <span className="h-16" />
          <Subscribe />
        </div>
      </Container>
    </Suspense>
  );
}
