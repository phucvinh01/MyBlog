import { getLastestBlog } from '@/services/blogServices';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const data = await getLastestBlog()
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
