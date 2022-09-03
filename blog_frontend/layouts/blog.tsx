import Image from 'next/future/image';
import { parseISO, format } from 'date-fns';
import { zhCN } from "date-fns/locale";
import { PropsWithChildren, Suspense } from 'react';

import Container from 'components/Container';
import Subscribe from 'components/Subscribe';
import ViewCounter from 'components/ViewCounter';
import { Post } from 'lib/types';

export default function BlogLayout({
  children,
  post
}: PropsWithChildren<{ post: Post }>) {
  return (
    <Container
      title={`${post.title} – ShaoHui`}
      description={post.excerpt}
      image={
        post?.coverImage
            ? `http://blog.shdev.life:12996${post?.coverImage}`
            : 'https://via.placeholder.com/1080'}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Xieshaohui"
              height={24}
              width={24}
              sizes="20vw"
              src="/avatar.png"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {'发布于 '}
              {format(parseISO(post.publishedAt), 'yyyy年 MMMM dd',{ locale: zhCN })}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {`约需阅读${post.readingTime.split(" min read")[0]}分钟`}
            {` • `}
            <ViewCounter slug={post.slug} />
          </p>
        </div>
        <Suspense fallback={null}>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
            {children}
          </div>
          <div className="mt-8">
            <Subscribe />
          </div>
        </Suspense>
      </article>
    </Container>
  );
}
