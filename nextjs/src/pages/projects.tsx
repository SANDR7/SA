import { createSSGHelpers } from "@trpc/react/ssg";
import type { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import { UseQueryResult } from "react-query";
import superjson from "superjson";

import PageContainer from "../components/layout";
import { meta } from "../data/meta";
import { appRouter } from "../server/router";
import { Sanity } from "../types/sanity/home.queries";
import { trpc } from "../utils/trpc";

const ProjectCard = dynamic(
  () => import("../components/ui/section/project/card")
);
const SectionHeader = dynamic(() => import("../components/ui/section/header"));

const Projects = () => {
  const { data: projects, isLoading }: UseQueryResult<Sanity.Projects.Home[]> =
    trpc.useQuery(["projects.all"]);
  return (
    <PageContainer title={meta.title + "Projects"}>
      <section>
        <SectionHeader title="Projects collection" />
        {!!projects &&
          projects.slice(0,6).map((project) => (
            <section
              about={project.title}
              key={project._id}
              className="my-[60px] group relative laptop:flex"
            >
              <ProjectCard {...project} />
            </section>
          ))}
      </section>
    </PageContainer>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: {} as any,
    transformer: superjson, // optional - adds superjson serialization
  });
  // prefetch from server
  await ssg.fetchQuery("projects.all");

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 30,
  };
}

export default Projects;
