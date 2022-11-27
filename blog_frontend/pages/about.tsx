import Link from 'next/link';
import Image from 'next/future/image';

import Container from 'components/Container';
import avatar from 'public/avatar.jpg';

export default function About() {
  return (
    <Container title="About – ShaoHui">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="mb-8 prose dark:prose-dark leading-6">
          <h2>Links</h2>
          <ul>
            <li>
              GitHub: <a href="https://github.com/huiboxes">@xieshaohui</a>
            </li>
            <li>
              Website:{' '}
              <Link href="https://shdev.life">
                <a>https://shdev.life</a>
              </Link>
            </li>
          </ul>

          <h2>Headshots</h2>
          <div className="flex space-x-8">
            <a href="/avatar.jpg">
              <Image
                alt="Xieshaohui headshot"
                width={400}
                quality={100}
                src={avatar}
                className="rounded-md"
              />
            </a>
            <a href="/avatar.jpg">
              <Image
                alt="Xieshaohui headshot"
                width={400}
                quality={100}
                src={avatar}
                className="rounded-md"
              />
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
