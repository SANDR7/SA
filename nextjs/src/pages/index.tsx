import type { GetStaticPropsContext, NextPage } from "next";
import superjson from "superjson";
import { appRouter } from "../server/router";
import { trpc } from "../utils/trpc";

import { createSSGHelpers } from "@trpc/react/ssg";
import parse from "html-react-parser";
import Image from "next/image";
import { UseQueryResult } from "react-query";
import PageContainer from "../components/layout";
import { Sanity } from "../types/sanity/home.queries";
import { meta } from "../utils/meta";

const Home: NextPage = () => {
  const { data: projects, isLoading }: UseQueryResult<Sanity.Home.Projects> =
    trpc.useQuery(["sanity.projects"]);

  return (
    <PageContainer title={meta.title + "Web Designer, Developer, Consumer"}>
      <section className="relative">
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
      </section>

      <hr />
      <div>
        {!!projects &&
          projects?.map((project) => (
            <div key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.excerpt}</p>
              <b>{project.type}</b>
              <p>
                <div>{project.production_link.find((link) => link)}</div>
              </p>
              <Image
                src={project.thumbnail.image}
                alt={project.thumbnail.caption}
                width={1200}
                height={800}
              />
            </div>
          ))}
      </div>
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
