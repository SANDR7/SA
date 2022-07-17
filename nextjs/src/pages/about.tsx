import { createSSGHelpers } from "@trpc/react/ssg";
import type { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import superjson from "superjson";
import { appRouter } from "../server/router";

import PageContainer from "../components/layout/main";
import SectionHeader from "../components/ui/section/header";
import { meta } from "../data/meta";
import { trpc } from "../utils/trpc";

const Skill = dynamic(() => import("../components/ui/section/about/skills"));
const Callout = dynamic(() => import("../components/ui/section/Callout"));
const Anchor = dynamic(() => import("../components/ui/section/anchor"));

const About = () => {
  const { data: skills } = trpc.useQuery(["about.skills"]);

  return (
    <PageContainer title={`${meta.name} — About`}>
      <section about="introducing myself">
        <Callout
          subTitle="Heeeeey"
          description="I'm Sander van Ast. A focused eye for design and code. And I like to work on computers, my health, people, cubes, bikes, Lego and most of all UI designs!"
        >
          I also <span className="text-blue">Develop</span> for a more enjoyable
          internet
        </Callout>
      </section>
      <section about="my skills">
        <SectionHeader title="My skills" />
        <div className="grid grid-cols-1 gap-y-6 pb-10 laptop:grid-cols-3 desktop:place-content-center desktop:place-items-center">
          <p className="border-y border-orange p-[5px] text-center tablet:p-[10px]">
            Programming languages
          </p>
          <p className="border-y border-green p-[5px] text-center tablet:p-[10px]">
            Software programs
          </p>
          <p className="border-y border-blue p-[5px] text-center tablet:p-[10px]">
            Development Tools
          </p>
        </div>
        <div className="grid grid-cols-2 py-2 mobile:place-items-center laptop:grid-cols-3 desktop:grid-cols-4">
          {!!skills &&
            skills.map((skill) => <Skill key={skill.name} {...skill} />)}
        </div>
      </section>
      <section about="recent blog articles">
        <SectionHeader title="Blog" />
      </section>

      <section about="contact me for neat project ideas">
        <SectionHeader title="Contact me" />

        <Callout subTitle="Contact">
          <Anchor
            name="hey@sandervanast.com"
            className="!lowercase"
            href="mailto:hey@sandervanast.com"
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

  await ssg.fetchQuery("about.skills");

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 30,
  };
}

export default About;
