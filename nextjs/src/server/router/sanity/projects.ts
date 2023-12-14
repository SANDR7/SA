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
  .query("single", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input }) {
      const project = await sanityClient.fetch<Sanity.Projects.Home>(
        `*[_type == 'projects' && slug.current == '${input.slug}'][0] {
        _id,
        'slug': slug.current,
        title,
        'report': report.asset->url
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
        await sanityClient.fetch(`*[_type == 'projects' && slug.current == '${input.slug}'][0] {
          'slug': slug.current,
          case_study->{
            title,
            'project': {
              'name': project->title,
              'thumbnail': {
                'image': project->thumbnail.asset->url,
                'caption': project->thumbnail.caption,
              },
              'excerpt': project->excerpt,
              'keywords': project->keywords,
            },
            'subjects': [
             {'summery': project->summery},
              {'tasks': responsibilities},
              {'research': research},
              {'concept': concept},
              {'persona': user_persona},
              {'testing': usability_test},
              {'wireframes': wireframes_prototypes},
              {'design': visual_design},
            ],
            'stats': [
              {
                'value': project->title,
                'name': 'Name'
              },
              {
                'value': project->client,
                'name': 'Client'
              },
              {
                'value': project->type,
                'name': 'Type'
              },
              {
                'value': role,
                'name': 'Role'
              },
            
              {
                'value': project->duration,
                'name': 'Duration Time'
              }
            ],
            'report': project->report.asset->url,
          }
        }`);

      return study;
    },
  });
