import { createBlog } from '@/services/blogServices';
import connectDB from '@/util/database';
import { NextResponse } from 'next/server';

export const POST = async (request: any) => {
  const { blog } = await request.json();
    console.log(blog);
  await connectDB()

  try {
    const create = await createBlog(blog)
    if(create) {
        return new NextResponse('blogest is created', { status: 200 });

    }
    else {
        return new NextResponse('blogest is create failed', { status: 200 });
    }
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
