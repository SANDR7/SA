import groq from "groq";
import { z } from "zod";
import { sanityClient } from "../../../libs/sanity";
import { Sanity } from "../../../types/sanity/queries";
import { createRouter } from "../context";

export const BlogRouter = createRouter().query("single", {
  input: z.object({
    slug: z.string(),
  }),
async resolve({input}) {
    const post = await sanityClient.fetch<Sanity.About.CV>(
      `*[_type== 'blogs' && slug.current == '${input.slug}'][0] {
          slug,
		  title,
		  excerpt,
      body,
        }`
    );

    return post;
  },
});
