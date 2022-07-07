import groq from "groq";
import { sanityClient } from "../../../utils/sanity";
import { createRouter } from "../context";

interface Project {
  title: string;
  excerpt?: string;
  _id: string;
  image?: string;
}

export const SanityRouter = createRouter().query("projects", {
  async resolve() {
    const projects: Project[] = await sanityClient.fetch(
      groq`*[_type == "projects"] | order(finished_date asc) {
        _id,
        excerpt,
        'type': type[0],
        title,
        'thumbnail': {
          'image': thumbnail.asset->url,
          'caption': thumbnail.caption
        }
      }`
    );

    return { projects };
  },
});
