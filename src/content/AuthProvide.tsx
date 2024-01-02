import { getNextAuthServerSession } from "@/app/api/auth/[...nextauth]/option";
import NextAuthProvider from "./SessionProvider";


export default async function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) { 
  const session = await getNextAuthServerSession();
    return <NextAuthProvider session={session}>{children}</NextAuthProvider>;
}