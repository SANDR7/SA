import groq from "groq";
import { z } from "zod";
import { sanityClient } from "../../../libs/sanity";
import { Sanity } from "../../../types/sanity/home.queries";
import { createRouter } from "../context";

export const ProjectRouter = createRouter()
  .query("home", {
    async resolve() {
      const projects = await sanityClient.fetch<Sanity.Projects.Home>(
        groq`*[_type == "projects" && highlighted] | order(finished_date desc)[0..1] {
        _id,
        'slug': slug.current,
        excerpt,
        'type': type[0],
        title,
        'thumbnail': {
          'image': thumbnail.asset->url,
          'caption': thumbnail.caption
        }
      } `
      );

      return projects;
    },
  })
  .query("all", {
    async resolve() {
      const projects = await sanityClient.fetch<Sanity.Projects.Home>(
        groq`*[_type == "projects"] | order(finished_date desc)[0..6] {
        _id,
        'slug': slug.current,
        excerpt,
        'type': type[0],
        title,
       'production_link': [client_link, saved_link, live_link],
        'thumbnail': {
          'image': thumbnail.asset->url,
          'caption': thumbnail.caption
        }
      } `
      );

      return projects;
    },
  })
  .query("by-slug", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input, ctx }) {
      const test = ctx.req?.query;

      const project = await sanityClient.fetch<Sanity.Projects.Home>(
        `*[_type == 'projects' && slug.current == '${input.slug}'][0] {
        _id,
        'slug': slug.current,
        title
      }`
      );

      return project;
    },
  });
