import NextAuth, { DefaultSession } from "next-auth"


type IUser = {
  email?: string | null | undefined;
  password?: string;
  name?: string | null | undefined;
  image?:string | null | undefined;
  id: string 
  role: string
};

type Author = {
   email?: string | null | undefined;
  name?: string | null | undefined;
  image?:string | null | undefined;
  id: string 
  role: string
}


type IBlog = {
  title: string,
  caption?: string | null,
  image: string,
  tag?: [string],
  author?: Author,
  slug?: string,
  location?: string,
  createAt: string
}




type INewBlog = {
  title: string,
  caption?: string | null,
  image: string,
  tag?: [string],
  author?: string,
  slug?: string,
  location?: string
}


declare module "next-auth" {
 
  interface Session {
    accessToken : string  & DefaultSession["user"]
    refreshToken: string & DefaultSession["user"]
    userId: any
  } 
}