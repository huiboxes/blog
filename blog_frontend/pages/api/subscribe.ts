import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response(
      JSON.stringify({
        error: '请输入邮箱'
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }

  if (email === 'huiboxes@gmail.com') {
    return new Response(
      JSON.stringify({
        error: '这只是个示例邮箱'
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }

  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscribers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });
  const data = await result.json();

  if (!result.ok) {
    return new Response(
      JSON.stringify({
        error: data.error.email[0]
      }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      }
    );
  }

  return new Response(
    JSON.stringify({
      error: ''
    }),
    {
      status: 201,
      headers: {
        'content-type': 'application/json'
      }
    }
  );
}
