// https://sanity-codegen-dev.vercel.app/

export declare namespace Sanity {
  namespace Home {
    type Projects = {
      _id: string;
      excerpt: string | null;
      production_link: [string | null, string | null, string | null];
      thumbnail: {
        caption: string;
        image: string;
      };
      title: string | null;
      type: string | null;
    }[];

    /**
     * A keyed type of all the codegen'ed queries. This type is used for
     * TypeScript meta programming purposes only.
     */
    type ProjectsMap = {
      Query: Projects;
    };

    type CV = {
      file: string;
      name: string;
    }[];
  }
}
