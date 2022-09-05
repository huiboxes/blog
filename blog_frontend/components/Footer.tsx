import Link from 'next/link';

import NowPlaying from 'components/NowPlaying';

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      {/* <NowPlaying /> */}
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600 transition">首页</a>
          </Link>
          <Link href="/blog">
            <a className="text-gray-500 hover:text-gray-600 transition">博客</a>
          </Link>
          {/* <Link href="/about">
            <a className="text-gray-500 hover:text-gray-600 transition">
              关于
            </a>
          </Link> */}
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://github.com/huiboxes">GitHub</ExternalLink>
          <ExternalLink href="https://juejin.cn/user/2858385965326968">
            掘金
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <Link href="/newsletter">
            <a className="text-gray-500 hover:text-gray-600 transition">
              订阅我
            </a>
          </Link>
          <Link href="/guestbook">
            <a className="text-gray-500 hover:text-gray-600 transition">
              留言板
            </a>
          </Link>
          {/* <Link href="/snippets">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Snippets
            </a>
          </Link> */}
          {/* <Link href="/tweets">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Tweets
            </a>
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
