import groq from "groq";
import { z } from "zod";
import { sanityClient } from "../../../libs/sanity";
import { Sanity } from "../../../types/sanity/queries";
import { createRouter } from "../context";

export const ProjectRouter = createRouter()
  .query("home", {
    async resolve() {
      const projects = await sanityClient.fetch<Sanity.Projects.Home>(
        groq`*[_type == "projects" && highlighted] | order(finished_date desc)[0..1] {
        _id,
        'slug': slug.current,
        excerpt,
        'tags': keywords,
        'production_link': [client_link, saved_link, live_link],
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
        'tags': keywords,
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
    async resolve({ input }) {
      const project = await sanityClient.fetch<Sanity.Projects.Home>(
        `*[_type == 'projects' && slug.current == '${input.slug}'][0] {
        _id,
        'slug': slug.current,
        title,
        likes,
        excerpt,
        keywords,
        'thumbnail': {
          'image': thumbnail.asset->url,
          'caption': thumbnail.caption
        },
        'contributors': contributors[]->name,
        'stack': used_tech[]->{ name, type[0] },
      }`
      );

      return project;
    },
  })
  .query("case", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input }) {
      const study =
        await sanityClient.fetch<any>(`*[_type == 'projects' && slug.current == '${input.slug}'][0] {
        case_study->{responsibilities, research}
      }`);

      const { case_study } = study;

      return case_study;
    },
  });
