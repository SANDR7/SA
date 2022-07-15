import Image from "next/image";
import PageContainer from "../components/layout/main";
import Anchor from "../components/ui/section/anchor";
import Callout from "../components/ui/section/Callout";
import SectionHeader from "../components/ui/section/header";
import { meta } from "../data/meta";
import { trpc } from "../utils/trpc";

const About = () => {
  const { data } = trpc.useQuery(["about.skills"]);

  return (
    <PageContainer title={meta.name + " — About"}>
      <section about="introducing myself">
        <Callout subTitle="Hallo">
          I also <span className="text-blue">Develop</span> for a more enjoyable
          internet
        </Callout>
      </section>
      <section about="my skills">
        <SectionHeader title="My skills" />
        <div className="grid grid-cols-2 py-2 desktop:grid-cols-4">
          {!!data?.LanguageSkills &&
            data?.LanguageSkills.map((skill) => (
              <span key={skill.name} className="flex gap-3 items-center">
                <Anchor
                  name={
                    <Image
                      src={skill.logo.image}
                      alt={`${skill.name} logo`}
                      height={60}
                      width={60}
                    />
                  }
                  newTab
                  className="h-[55px] w-[55px]"
                  href={skill.link as string}
                />
                <SectionHeader title={skill.name as string} isText />
              </span>
            ))}
        </div>
      </section>
      <section about="recent blog articles">
        <SectionHeader title="Blog" />
      </section>
    </PageContainer>
  );
};

export default About;
