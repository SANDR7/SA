import { createSSGHelpers } from "@trpc/react/ssg";
import parse from "html-react-parser";
import type { GetStaticPropsContext, NextPage } from "next";
import { UseQueryResult } from "react-query";
import superjson from "superjson";

import PageContainer from "../components/layout";
import Anchor from "../components/ui/section/anchor";
import Callout from "../components/ui/section/Callout";
import SectionHeader from "../components/ui/section/header";
import ProjectCard from "../components/ui/section/project/card";
import { meta } from "../data/meta";
import { appRouter } from "../server/router";
import { Sanity } from "../types/sanity/home.queries";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: projects, isLoading }: UseQueryResult<Sanity.Projects.Home[]> =
    trpc.useQuery(["projects.home"]);

  return (
    <PageContainer title={meta.title + "Web Designer, Developer & Consumer"}>
      <Callout subTitle="Hi There" description={meta.description}>
        {parse(meta.slogan)}
      </Callout>

      <section about="projects">
        <SectionHeader title="Recent projects" />
        {!!projects &&
          projects?.map((project) => (
            <section
              about={project.title}
              key={project._id}
              className="my-[60px] group relative laptop:flex"
            >
              <ProjectCard {...project} />
            </section>
          ))}
      </section>
      <section about="contact me for neat project ideas">
        <SectionHeader title="Contact me" />

        <Callout subTitle="Contact">
          <Anchor
            name="media@sandervanast.com"
            className="!lowercase"
            href="mailto:media@sandervanast.com"
            newTab
          />
        </Callout>
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
  await ssg.fetchQuery("projects.home");

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 30,
  };
}

export default Home;
