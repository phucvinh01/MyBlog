import { createBlog, getAllBlog } from '@/services/blogServices';
import connectDB from '@/util/database';
import { NextResponse } from 'next/server';

export const POST = async (request: any) => {
  const { blog } = await request.json();
    console.log("check blog server" ,blog);
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

export const GET = async () => {
  try {
    const data = await getAllBlog()
    if(data) {
        return NextResponse.json({ data })
    }
    else {
        return new NextResponse('get all list blog failed', { status: 500 });
    }
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
}
