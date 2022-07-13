import { createSSGHelpers } from "@trpc/react/ssg";
import groq from "groq";
import { GetServerSidePropsContext, GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";
import superjson from "superjson";

import CaseContainer from "../../components/layout/case";
import { sanityClient } from "../../libs/sanity";
import { appRouter } from "../../server/router";
import { Sanity } from "../../types/sanity/projects.queries";
import { trpc } from "../../utils/trpc";

const Case: NextPage<Sanity.Projects.Slug> = ({ slug }) => {
  const { asPath } = useRouter();
  const { data: project, isLoading } = trpc.useQuery([
    "projects.by-slug",
    { slug },
  ]);

  console.log(project);
  

  return (
    <CaseContainer title={project?.title as string} description="test">
      Case {project?.title}
    </CaseContainer>
  );
};

export async function getStaticProps(
  context: GetServerSidePropsContext<Sanity.Projects.Slug>
) {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: {} as any,
    transformer: superjson,
  });
  const slug = context.params?.slug as string;

  // Prefetch `post.byId`
  await ssg.fetchQuery("projects.by-slug", {
    slug,
  });

  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
    revalidate: 30,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await sanityClient.fetch<Sanity.Projects.Slug[]>(
    groq`*[_type == 'projects'] {'slug': slug.current}`
  );


  return {
    paths: projects.map((project: any) => ({
      params: {
        slug: project.slug,
      },
    })),
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-blocking
    fallback: "blocking",
  };
};

export default Case;
