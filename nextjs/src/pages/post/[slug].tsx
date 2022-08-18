import { createSSGHelpers } from "@trpc/react/ssg";
import groq from "groq";
import { GetServerSidePropsContext, NextPage } from "next";
import { UseQueryResult } from "react-query";
import superjson from "superjson";

import PageContainer from "../../components/layout/main";
import { sanityClient } from "../../libs/sanity";
import { appRouter } from "../../server/router";
import { Sanity } from "../../types/sanity/queries";
import { trpc } from "../../utils/trpc";

const Blog: NextPage<{ slug: string }> = ({ slug }) => {
 const { data: blog }: UseQueryResult<any> = trpc.useQuery(
    ["blog.single", { slug }]
  );

  return <PageContainer title={`Post ― ${blog?.title} | Sander van Ast`}>{blog?.excerpt}</PageContainer>;
};
export async function getStaticProps(
  context: GetServerSidePropsContext<{ slug: string }>
) {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: {} as any,
    transformer: superjson,
  });
  const slug = context.params?.slug as string;

  await ssg.fetchQuery("projects.by-slug", {
    slug,
  });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 30,
  };
}

export const getStaticPaths = async () => {
  const posts = await sanityClient.fetch<Sanity.About.Posts[]>(
    groq`*[_type == 'blogs'] {'slug': slug.current}`
  );

  const paths = posts.map((post: { slug: string | undefined }) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: "blocking",
  };
};

export default Blog;
