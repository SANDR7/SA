import { useAutoAnimate } from "@formkit/auto-animate/react";
import { createSSGHelpers } from "@trpc/react/ssg";
import type { GetStaticPropsContext, NextPage } from "next";
import dynamic from "next/dynamic";
import superjson from "superjson";
import { appRouter } from "../server/router";

import { useState } from "react";
import PageContainer from "../components/layout/main";
import Posts from "../components/ui/section/about/posts";
import SectionHeader from "../components/ui/section/header";
import { meta } from "../data/meta";
import { trpc } from "../utils/trpc";

const Skill = dynamic(() => import("../components/ui/section/about/skills"));
const Callout = dynamic(() => import("../components/ui/section/Callout"));
const Anchor = dynamic(() => import("../components/ui/section/anchor"));

const About: NextPage = () => {
  const { data: skills } = trpc.useQuery(["about.skills"]);
  const { data: blogs } = trpc.useQuery(["about.blog-posts"]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [filterSkills, setFilterSkills] = useState(skills);

  const [skillRef] = useAutoAnimate<HTMLDivElement>();

  const filters = [
    {
      title: "Programming languages",
      color: "orange",
      value: "language",
    },
    {
      title: "Software programs",
      color: "green",
      value: "program",
    },
    {
      title: "Development tools",
      color: "blue",
      value: "tool",
    },
    {
      title: "All skills",
      color: "white",
      value: "All",
    },
  ];

  const handleSkillFilter = (type: string) => {
    setActiveFilter(type);

    if (type === "All") {
      setFilterSkills(skills);
    } else {
      setFilterSkills(skills?.filter((skills) => skills?.type?.includes(type)));
    }
  };

  return (
    <PageContainer title={`${meta.name} — About`}>
      <section about="introducing myself">
        <Callout
          subTitle="Heeeeey"
          description="I'm Sander van Ast, I have a focused eye for design and I like to code. And I love to work on computers, my health, people, cubes, bikes, Lego and most of all UI designs!"
        >
          I also <span className="text-blue">Develop</span> for a more enjoyable
          internet
        </Callout>
      </section>
      <section about="my skills">
        <SectionHeader title="My skills" />
        <div className="grid grid-cols-1 gap-y-6 pb-10 laptop:grid-cols-4 desktop:place-content-center desktop:place-items-center">
          {filters.map((filter, idx) => (
            <p
              key={idx}
              onClick={() => handleSkillFilter(filter.value)}
              className={`border-y border-${filter.color} ${
                activeFilter === filter.value ? `text-${filter.color}` : ""
              } cursor-pointer p-[5px] text-center tablet:p-[10px]`}
            >
              {filter.title}
            </p>
          ))}
        </div>
        <div
          className="grid grid-cols-2 py-2 mobile:place-items-center laptop:grid-cols-3 desktop:grid-cols-4"
          ref={skillRef}
        >
          {!!skills &&
            filterSkills?.map((skill) => <Skill key={skill.name} {...skill} />)}
        </div>
      </section>
      <section about="recent blog articles">
        <SectionHeader title="Blog" />
        <div className="grid grid-cols-1 gap-10 py-2 desktop:grid-cols-2">
          {blogs?.length ? (
            blogs?.map((post, idx: number) => (
              <span key={idx}>
                <Posts {...post} />
              </span>
            ))
          ) : (
            <p>No post written yet...</p>
          )}
        </div>
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
