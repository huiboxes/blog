import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const email = req.query.email.toString();

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

      const existEmail = await prisma.subscribes.findFirst({
        where: {
          email
        }
      });
      console.log(existEmail);

      if (existEmail) {
        return res.status(400).json({
          error: '该邮箱已经订阅过了'
        })
      }

      const newEntry = await prisma.subscribes.create({
        data: {
          email,
          created_by: 'admin'
        }
      });

      return res.status(200).json({
        id: newEntry.id.toString(),
        email: newEntry.email
      });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}