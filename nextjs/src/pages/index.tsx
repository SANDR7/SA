import { createSSGHelpers } from "@trpc/react/ssg";
import parse from "html-react-parser";
import type { GetStaticPropsContext, NextPage } from "next";
import { UseQueryResult } from "react-query";
import superjson from "superjson";

import PageContainer from "../components/layout";
import SectionHeader from "../components/ui/section/header";
import ProjectCard from "../components/ui/section/project/card";
import { appRouter } from "../server/router";
import { Sanity } from "../types/sanity/home.queries";
import { meta } from "../utils/meta";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: projects, isLoading }: UseQueryResult<Sanity.Home.Projects[]> =
    trpc.useQuery(["sanity.projects"]);

  return (
    <PageContainer title={meta.title + "Web Designer, Developer & Consumer"}>
      <span
        className="font-bold text-white-600 dark:text-black-600
            text-[48px]

            tablet:text-[62px]

            laptop:text-[92px]

            desktop:text-[144px]
        "
      >
        Hi there,{" "}
      </span>
      <span
        className="relative 
      
          left-[0rem] top-[-1.8rem]

          tablet:left-[.8rem] tablet:top-[-2.2rem]

          laptop:left-[1rem] laptop:top-[-3.2rem]

          desktop:left-[6rem] desktop:top-[-6rem]
        "
      >
        <h2
          className="font-bold 
            leading-9 text-[28px]

            tablet:leading-[.9] tablet:text-[40px]

            laptop:text-[56px] laptop:leading-[1]

            desktop:text-[76px] desktop:w-auto desktop:leading-none
           "
        >
          {parse(meta.slogan)}
        </h2>
        <p className="tablet:w-8/12 desktop:w-4/12 opacity-70 mt-4">
          {meta.description}
        </p>
      </span>

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
  await ssg.fetchQuery("sanity.projects");

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 30,
  };
}

export default Home;
