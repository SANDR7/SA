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
  namespace About {
    type CV = {
      file: string;
      name: string;
    }[];
  }
}
