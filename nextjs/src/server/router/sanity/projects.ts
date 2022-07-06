import groq from "groq";
import { sanityClient } from "../../../utils/sanity";
import { createRouter } from "../context";

interface projectProps {
	title: string,
	excerpt?: string
}


export const SanityRouter = createRouter().query("projects", {
  async resolve() {
    const projects: projectProps[] = await sanityClient.fetch(
      groq`*[_type == "projects"] {excerpt, title }`
    );

    return {
      projects,
    };
  },
});
