import Link from 'next/link';

import Container from 'components/Container';

export default function NotFound() {
  return (
    <Container title="404 – ShaoHui">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          404 – 没有找到你想要的
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          为什么要显示一个通用的404?似乎你找到了曾经存在的东西，或者你拼了什么错了。
          我猜你拼写错了。你能再确认一下网址吗?
        </p>
        <Link href="/">
          <a className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white">
            返回首页
          </a>
        </Link>
      </div>
    </Container>
  );
}
