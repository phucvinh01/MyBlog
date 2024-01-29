import fetcher from '@/util/fetcher';
import useSWR from 'swr';
import BlogPage from '@/components/BlogPage';
import { Metadata, ResolvingMetadata } from 'next';
import { getMetaBlogApi } from '@/util/getMataAPI';

type Props = {
  params: { slug: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  //console.log(params);
  const blog = await getMetaBlogApi(params.slug);

  return {
    title: blog.data.title,
  };
};

const Page = ({ params }: { params: { slug: string } }) => {
  // return <>{params.slug}</>
  return (
      <BlogPage slug={params.slug} />
  );
};

export default Page;
