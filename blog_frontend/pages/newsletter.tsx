import Container from 'components/Container';
import Subscribe from 'components/Subscribe';

export default function Newsletter() {
  return (
    <Container
      title="Newsletter – ShaoHui"
      description="Thoughts on the software industry, programming, tech, videography, music, and my personal life."
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          订阅
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          &emsp;&emsp;我的时事通讯提供了我正在做的事情和正在写的东西的幕后信息。我经常分享一些我读过的最喜欢的文章，以及任何关于技术的有趣的东西。
        </p>
        <Subscribe />
      </div>
    </Container>
  );
}
