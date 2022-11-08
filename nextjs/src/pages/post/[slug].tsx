import { PortableText } from "@portabletext/react";

import { createSSGHelpers } from "@trpc/react/ssg";
import groq from "groq";
import { GetServerSidePropsContext, NextPage } from "next";
import { UseQueryResult } from "react-query";
import superjson from "superjson";

import PageContainer from "../../components/layout/main";
import { PortableTextComponent } from "../../components/ui/section/sanity/portableText";
import { sanityClient } from "../../libs/sanity";
import { appRouter } from "../../server/router";
import { Sanity } from "../../types/sanity/queries";
import { trpc } from "../../utils/trpc";

const Blog: NextPage<{ slug: string }> = ({ slug }) => {
  const { data: blog }: UseQueryResult<Sanity.About.Articles> = trpc.useQuery([
    "blog.single",
    { slug },
  ]);

  return (
    <PageContainer
      title={`Post ― ${blog?.title} | Sander van Ast`}
      customTitle={blog?.title}
      className="bottom-[-.4rem] mobile:!text-[24px] tablet:!text-[42px] desktop:!text-[74px] "
    >
      <article className="m-auto mb-[4rem] mobile:w-11/12 tablet:w-full laptop:w-1/2">
        <PortableText value={blog?.body} components={PortableTextComponent} />
      </article>
    </PageContainer>
  );
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

  await ssg.fetchQuery("blog.single", {
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
