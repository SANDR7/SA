import type { GetStaticPropsContext, NextPage } from "next";
import superjson from "superjson";
import { appRouter } from "../server/router";
import { trpc } from "../utils/trpc";

import { createSSGHelpers } from "@trpc/react/ssg";
import Image from "next/image";
import PageContainer from "../components/layout";
import { meta } from "../utils/meta";

const Home: NextPage = () => {
  const {
    data: { projects },
    isLoading,
  }: any = trpc.useQuery(["sanity.projects"]);

  // console.log(projects);

  return (
    <PageContainer title={meta.title + "Web Designer, Developer, Consumer"}>
      <h1>{meta.slogan}</h1>

      <div>
        {projects &&
          projects.map((project: any) => (
            <div key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.excerpt}</p>
              <b>{project.type}</b>
              <Image src={project.thumbnail.image} width={1200} height={800} />
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
