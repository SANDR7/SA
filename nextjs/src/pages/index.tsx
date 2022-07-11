import { createSSGHelpers } from "@trpc/react/ssg";
import parse from "html-react-parser";
import type { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import { UseQueryResult } from "react-query";
import superjson from "superjson";

import PageContainer from "../components/layout";
import Anchor from "../components/ui/section/anchor";
import SectionHeader from "../components/ui/section/header";
import { appRouter } from "../server/router";
import { Sanity } from "../types/sanity/home.queries";
import { meta } from "../utils/meta";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: projects, isLoading }: UseQueryResult<Sanity.Home.Projects> =
    trpc.useQuery(["sanity.projects"]);

  return (
    <PageContainer title={meta.title + "Web Designer, Developer, Consumer"}>
      <div className="relative">
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
      
          left-[0.4rem]
          top-[-1.8rem]

          tablet:left-[.8rem]
          tablet:top-[-2.2rem]

          laptop:left-[4rem]
          laptop:top-[-3.2rem]

        desktop:left-[10rem]
        desktop:top-[-6rem]
        "
        >
          <h2
            className="font-bold 
            leading-9
          text-[32px]
          tablet:leading-[.9]
          tablet:text-[40px]

          laptop:text-[56px]
          laptop:leading-[1]

           desktop:text-[72px]
           desktop:w-auto
           desktop:leading-tight
           "
          >
            {parse(meta.slogan)}
          </h2>
          <p className="tablet:w-8/12 desktop:w-4/12 opacity-70 mt-4">
            {meta.description}
          </p>
        </span>
      </div>

      <section about="projects">
        <SectionHeader title="Recent projects" />
        {!!projects &&
          projects?.map((project) => (
            <section
              about={project.title}
              key={project._id}
              className="my-[50px] relative laptop:flex"
            >
              <div className="desktop:w-9/12 laptop:w-10/12">
                <h4 className="desktop:h-[154px] font-medium flex items-stretch leading-[1.1] ">
                  <span className="desktop:text-[76px] self-end">
                    {project.title}
                    <span className="text-orange">.</span>
                  </span>
                </h4>
                <div className="flex flex-col desktop:my-[10px] desktop:pl-[40px] desktop:w-10/12 desktop:border-l desktop:ml-[65px]">
                  <p className="">{project.excerpt}</p>
                  <strong className="uppercase desktop:mt-[80px]">
                    {project.type === "graphic"
                      ? "graphic design"
                      : project.type}
                  </strong>
                  <Anchor
                    name={
                      project.type === "graphic"
                        ? "source"
                        : project.type === "brand"
                        ? "website"
                        : "live demo"
                    }
                    href={
                      project.production_link.find((link) => link) as string
                    }
                    newTab
                  />
                </div>
              </div>
                <Image
                  src={project.thumbnail.image}
                  alt={project.thumbnail.caption}
                  width={1200}
                  height={800}
                  className="w-max aspect-4/3"
                  objectFit="cover"
                />
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
