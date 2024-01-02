import NextAuth, { DefaultSession } from "next-auth"


type IUser = {
  email?: string | null | undefined;
  password?: string;
  name?: string | null | undefined;
  image?:string | null | undefined
};


type IBlog = {
  title: string,
  caption?: string | null,
  image?: string,
  tag?: string,
  author?: string,
  slug?: string,
  location?: string
}


declare module "next-auth" {
 
  interface Session {
    accessToken : string  & DefaultSession["user"]
    refreshToken: string & DefaultSession["user"]
  } 
}