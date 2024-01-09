import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions} from "../auth/[...nextauth]/option";


export async function GET() {
  const session = await getServerSession(authOptions);

  return NextResponse.json({ name: session?.user?.name ?? "Not Logged In" });
}