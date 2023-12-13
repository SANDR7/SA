/* eslint-disable @next/next/no-img-element */
import { createSSGHelpers } from "@trpc/react/ssg";
import { GetStaticPaths, GetStaticPropsContext, NextPage } from "next";
import superjson from "superjson";

import CaseContainer from "../../components/layout/case";
import PageContainer from "../../components/layout/main";
import Anchor from "../../components/ui/section/anchor";
import SectionHeader from "../../components/ui/section/header";
import { sanityClient } from "../../libs/sanity";
import { appRouter } from "../../server/router";
import { Sanity } from "../../types/sanity/queries";
import { trpc } from "../../utils/trpc";
import { useHorizontalScroll } from "../../utils/useHorizontalScroll";
import Custom404 from "../404";

const Case: NextPage<{ slug: string }> = ({ slug }) => {
  const project = trpc.useQuery(["projects.case", { slug }]);
  const scrollRef = useHorizontalScroll() as any;

  if (project.isLoading)
    return <PageContainer title="Loading content">Loading...</PageContainer>;
  if (!project.data) return <Custom404 />;

  const study = project.data?.case_study as Sanity.Projects.Study;

  // reduce vs filter?
  const filterSubjects = study?.subjects?.filter((subject: any) => {
    return (
      subject?.design !== null &&
      subject?.tasks !== null &&
      subject?.testing !== null &&
      subject?.persona !== null &&
      subject?.summery !== null &&
      subject?.research !== null &&
      subject?.wireframes !== null &&
      subject?.userflow !== null
    );
  });

  return filterSubjects ? (
    <CaseContainer
      title={`${study?.project.name}`}
      description={study?.project?.excerpt}
      keywords={study?.project?.keywords}
      image={study?.project?.thumbnail?.image}
    >
      <section className="px-4 mobile:grid-cols-2 tablet:grid tablet:grid-cols-3 laptop:grid-cols-5">
        {study?.stats &&
          study?.stats.map(
            (
              stat: { name?: number | string; value?: number | string },
              idx: number
            ) => (
              <span key={idx}>
                <SectionHeader
                  title={`${stat.value || 0}`}
                  className="min-w-[12.2rem] capitalize"
                  name={stat.name as string}
                  isText
                />
              </span>
            )
          )}
      </section>
      <section className="h-[43vh]  overflow-hidden">
        <section
          ref={scrollRef}
          className="flex h-[45vh] min-w-[14rem] overflow-auto overflow-y-hidden"
        >
          <img
            src={study?.project.thumbnail.image}
            alt={study?.project.thumbnail.caption}
            className="p-6"
          />
        </section>
      </section>
      {study.report && (
        <section>
          <SectionHeader
            title={
              <Anchor href={`${study.report}`} newTab name="Design Report" title="Design report" />
            }
            name={`report of ${study.project.name}`}
          />
        </section>
      )}
    </CaseContainer>
  ) : (
    <Custom404 />
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: {} as any,
    transformer: superjson, // optional - adds superjson serialization
  });
  const slug = context.params?.slug as string;
  // prefetch `post.byId`
  await ssg.fetchQuery("projects.single", {
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
  const projects = await sanityClient.fetch(
    `*[_type == 'projects'] {'slug': slug.current}`
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
