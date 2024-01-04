import { getUserCurrent } from '@/services/userServices';
import connectDB from '@/util/database';
import { NextResponse } from 'next/server';

export const POST = async (request: any) => {
  const { email } = await request.json();
  await connectDB();

  console.log("check email", email);

  try {
    const id = await getUserCurrent(email);
    if (id) {
      return NextResponse.json(id);
    } else {
      return new NextResponse('blogest is create failed', { status: 200 });
    }
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
