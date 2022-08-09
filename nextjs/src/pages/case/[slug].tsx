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

const Case: NextPage<{ slug: string }> = ({ slug }) => {
  const { data: project }: UseQueryResult<Sanity.Projects.Case> = trpc.useQuery(
    ["projects.by-slug", { slug }]
  );

  const { data: study } = trpc.useQuery(["projects.case", { slug }]);

  console.log(study);

  return (
    <CaseContainer
      title={project?.title}
      description={project?.excerpt}
      keywords={project?.keywords}
      image={project?.thumbnail?.image}
    >
      Case {project?.title}
      <PortableText value={study.responsibilities}  />
      <PortableText value={study.research} />
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
