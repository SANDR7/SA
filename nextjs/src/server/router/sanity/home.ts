import groq from "groq";
import { sanityClient } from "../../../utils/sanity";
import { createRouter } from "../context";

interface Project {
  title: string;
  excerpt?: string;
  _id: string;
  image?: string;
}

export const SanityRouter = createRouter()
  .query("projects", {
    async resolve() {
      const projects: Project[] = await sanityClient.fetch(
        groq`*[_type == "projects"][0..1] | order(finished_date desc) {
        _id,
        excerpt,
        'type': type[0],
        title,
       'production_link': [client_link, saved_link, live_link],
        'thumbnail': {
          'image': thumbnail.asset->url,
          'caption': thumbnail.caption
        }
      }`
      );

      return { projects };
    },
  })
  .query("CV", {
    async resolve() {
      const CV = await sanityClient.fetch(
        groq`*[_type== 'contributors' && name match 'Sander van Ast'] {
          name, 
          'file': business_file.asset->url
        }`
      );

      return CV[0];
    },
  });
