import groq from "groq";
import { sanityClient } from "../../../libs/sanity";
import { Sanity } from "../../../types/sanity/home.queries";
import { createRouter } from "../context";

export const AboutRouter = createRouter()
  .query("CV", {
    async resolve() {
      const CV = await sanityClient.fetch<Sanity.About.CV>(
        groq`*[_type== 'contributors' && name match 'Sander van Ast'][0] {
          name, 
          'file': business_file.asset->url
        }`
      );

      return CV;
    },
  })
  .query("socials", {
    async resolve() {
      const socials = await sanityClient.fetch<
        Sanity.About.Socials
      >(groq`*[_type== 'contributors' && name match 'Sander van Ast'][0] {
      'media': socials[][0..3]{
        name,
        link,
        // 'username': username,
      }
   
    }`);

      return socials;
    },
  });
