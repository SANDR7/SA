import { PortableText } from "@portabletext/react";
import { createSSGHelpers } from "@trpc/react/ssg";
import groq from "groq";
import { GetServerSidePropsContext, GetStaticPaths, NextPage } from "next";
import { UseQueryResult } from "react-query";
import superjson from "superjson";

import CaseContainer from "../../components/layout/case";
import { sanityClient } from "../../libs/sanity";
import { appRouter } from "../../server/router";
import { Sanity } from "../../types/sanity/queries";
import { trpc } from "../../utils/trpc";
import { useHorizontalScroll } from "../../utils/useHorizontalScroll";

const Case: NextPage<{ slug: string }> = ({ slug }) => {
  const { data: project }: UseQueryResult<Sanity.Projects.Case> = trpc.useQuery(
    ["projects.by-slug", { slug }]
  );

  const { data: study } = trpc.useQuery(["projects.case", { slug }]);

  console.log(project);

  const scrollRef = useHorizontalScroll() as any;

  return (
    <CaseContainer
      title={project?.title}
      description={project?.excerpt}
      keywords={project?.keywords}
      image={project?.thumbnail?.image}
    >
      <div ref={scrollRef} className="flex h-[45vh] w-full overflow-auto">
        <div className="w-1/2 flex-shrink-0 border">
          I will definitely overflow due to the small width of my parent
          container Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
          optio officiis, nulla iure consequatur nisi accusamus explicabo culpa
          nemo nostrum ad dicta ullam cupiditate beatae laborum autem quis neque
          modi?
        </div>
        <div className="w-1/2 flex-shrink-0 border">
          I will definitely overflow due to the small width of my parent
          container Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
          optio officiis, nulla iure consequatur nisi accusamus explicabo culpa
          nemo nostrum ad dicta ullam cupiditate beatae laborum autem quis neque
          modi?
        </div>
        <div className="w-1/2 flex-shrink-0 border">
          I will definitely overflow due to the small width of my parent
          container Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
          optio officiis, nulla iure consequatur nisi accusamus explicabo culpa
          nemo nostrum ad dicta ullam cupiditate beatae laborum autem quis neque
          modi?
        </div>
      </div>
      <PortableText value={study?.responsibilities} />
      <PortableText value={study?.research} />
    </CaseContainer>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await sanityClient.fetch<Sanity.Projects.Case[]>(
    groq`*[_type == 'projects'] {'slug': slug.current}`
  );

  return {
    paths: projects.map((project: { slug: string | undefined }) => ({
      params: {
        slug: project.slug,
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: "blocking",
  };
};

export default Case;
