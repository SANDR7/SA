// https://sanity-codegen-dev.vercel.app/

export declare namespace Sanity {
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
}
