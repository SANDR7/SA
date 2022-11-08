// https://sanity-codegen-dev.vercel.app/

export declare namespace Sanity {
  namespace Projects {
    type Home = {
      _id: string;
      slug: string | undefined;
      excerpt: string | undefined;
      tags: string[] | undefined;
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

    type Study = {
      title: string | undefined;
      project: {
        keywords: string[] | undefined;
        excerpt: string | undefined;
        name: string | undefined;
        thumbnail: {
          image: string | undefined;
          caption: string | undefined;
        };
      };
      subjects?:
        | [
            { concept: any | undefined },
            { research: any[] | undefined },
            { tasks: any[] | undefined },
            { testing: any[] | undefined },
            { summery: any[] | undefined },
            { wireframes: any[] | undefined },
            { design: any | undefined }
          ]
        | undefined;
      stats: [
        { value: number | string | undefined },
        { name: number | string | undefined }
      ];
    };

    type StudySubjects = {
      concept: any | undefined;
      research: any[] | undefined;
      tasks: any[] | undefined;
      testing: any[] | undefined;
      persona: any[] | undefined;
      summery: any[] | undefined;
      task: any[] | undefined;

      wireframes: any[] | undefined;
      design: any | undefined;
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

    type Articles = {
      slug: string;
      title: string;
      excerpt: string;
      body: any[];
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
    };
    type SkillsData = {
      name: string | undefined;
      link: string | undefined;
      type: string | undefined;
      logo: {
        image: string;
      };
    };

    type Posts = {
      body: unknown | undefined;
      excerpt: string | undefined;
      likes: number;
      slug: string | undefined;
      title: string | undefined;
      createdAt: string | number | Date;
      tags: string[];
    };
  }
}
