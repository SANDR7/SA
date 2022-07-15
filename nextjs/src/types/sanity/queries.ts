// https://sanity-codegen-dev.vercel.app/

export declare namespace Sanity {
  namespace Projects {
    type Home = {
      _id: string;
      slug: string | undefined;
      excerpt: string | undefined;
      production_link: [
        string | undefined,
        string | undefined,
        string | undefined
      ];
      thumbnail: {
        caption: string | undefined;
        image: string;
      };
      title: string | undefined;
      type: string | undefined;
    };

    /**
     * A keyed type of all the codegen'ed queries. This type is used for
     * TypeScript meta programming purposes only.
     */
    type ProjectsMap = {
      Query: Home;
    };
  }
  namespace Projects {
    type Case = {
      _id: string;
      slug: string | undefined;
      excerpt: string | undefined;
      production_link: [
        string | undefined,
        string | undefined,
        string | undefined
      ];
      thumbnail: {
        caption: string | undefined;
        image: string;
      };
      title: string | undefined;
      type: string | undefined;
      keywords: string[] | undefined;
      likes: number;
      case_study: unknown | any;
      contributors: string[];
      stack: {
        name: string;
        type: string[];
      };
    };
  }
  namespace About {
    type CV = {
      file: string;
      name: string;
    };

    type Socials = {
      media: {
        name: string;
        link: string;
        username?: string;
      }[];
    };

    type SpotifyPlaying = {
      artist: string | string[];
      isPlaying: boolean;
      songUrl: string;
      title: string;
    };
    type Skills = {
      LanguageSkills: SkillsData[];
      ToolSkills: SkillsData[];
      ProgramSkills: SkillsData[];
    }
    type SkillsData = {
      name: string | undefined;
      link: string | undefined;
      logo: {
        image: string;
      };
    };
  }
}
