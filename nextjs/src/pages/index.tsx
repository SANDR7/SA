/* eslint-disable @next/next/no-img-element */
import { createSSGHelpers } from "@trpc/react/ssg";
import parse from "html-react-parser";
import type { GetStaticPropsContext, NextPage } from "next";
import dynamic from "next/dynamic";
import { UseQueryResult } from "react-query";
import superjson from "superjson";

import PageContainer from "../components/layout/main";
import { meta } from "../data/meta";
import { appRouter } from "../server/router";
import { Sanity } from "../types/sanity/home.queries";
import { trpc } from "../utils/trpc";

const ProjectCard = dynamic(
  () => import("../components/ui/section/project/card")
);
const Callout = dynamic(() => import("../components/ui/section/Callout"));
const SectionHeader = dynamic(() => import("../components/ui/section/header"));
const Anchor = dynamic(() => import("../components/ui/section/anchor"));

const Home: NextPage = () => {
  const { data: projects }: UseQueryResult<Sanity.Projects.Home[]> =
    trpc.useQuery(["projects.home"]);

  return (
    <PageContainer title={meta.title + "Web Designer, Developer & Consumer"}>
      <section about="what I can do best">
        <Callout subTitle="Hi There" description={meta.description}>
          {parse(meta.slogan)}
        </Callout>
        <div className="w-fill relative h-9 animate-bounce">
          <img
            src="./assets/ArrowDown.png"
            className="absolute dark:invert tiny:hidden mobile:right-0 mobile:block laptop:bottom-[5rem] laptop:left-0"
            alt="scroll indicator"
          />
        </div>
      </section>

      <section about="projects">
        <SectionHeader title="Recent projects" />
        {!!projects &&
          projects?.map((project) => (
            <section
              about={project.title}
              key={project._id}
              className="group relative my-[60px] laptop:flex"
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

  await ssg.fetchQuery("projects.home");

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 30,
  };
}

export default Home;
