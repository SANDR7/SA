import type { GetStaticPropsContext, NextPage } from "next";
import superjson from "superjson";
import { appRouter } from "../server/router";
import { trpc } from "../utils/trpc";

import { createSSGHelpers } from "@trpc/react/ssg";
import Image from "next/image";
import PageContainer from "../components/layout";
import { meta } from "../utils/meta";
import parse from "html-react-parser";

const Home: NextPage = () => {
  const {
    data: { projects },
    isLoading,
  }: any = trpc.useQuery(["sanity.projects"]);

  // console.log(projects);

  return (
    <PageContainer title={meta.title + "Web Designer, Developer, Consumer"}>
      <section className="relative">
        <span className="font-bold desktop:text-[144px] text-white-600 dark:text-black-600">
          Hello,{" "}
        </span>
        <span className="relative left-[10rem] top-[-6rem]">
          <h2 className="font-bold leading-tight desktop:text-[72px]">
            {parse(meta.slogan)}
          </h2>
          <p className="w-4/12">{meta.description}</p>
        </span>
      </section>

      <hr />
      <div>
        {projects &&
          projects.map((project: any) => (
            <div key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.excerpt}</p>
              <b>{project.type}</b>
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

