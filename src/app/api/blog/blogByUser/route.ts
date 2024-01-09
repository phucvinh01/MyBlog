import { getBlogByAuthor } from '@/services/blogServices';
import connectDB from '@/util/database';
import { NextResponse } from 'next/server';

export const GET = async (request: any) => {
  const {searchParams} = new URL(request.url);
    const idAuthor = searchParams.get("idAuthor");
  await connectDB();

  try {
    const data = await getBlogByAuthor(idAuthor as string);
    if (data) {
      return NextResponse.json({ data });
    } else {
      return new NextResponse('get all list blog failed', { status: 500 });
    }
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
