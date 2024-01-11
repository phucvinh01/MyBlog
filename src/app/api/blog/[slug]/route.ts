import { getOneBlogBySlug } from '@/services/blogServices';
import connectDB from '@/util/database';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { pathname } = new URL(request.url);

  const slug = pathname.split('blog/')[1];


  await connectDB();

  try {
    const data = await getOneBlogBySlug(slug as string);
    if (data) {
      return NextResponse.json({ data });
    } else {
      return new NextResponse('get blog failed', { status: 500 });
    }
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
