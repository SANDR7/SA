import groq from "groq";
import { sanityClient } from "../../../libs/sanity";
import { Sanity } from "../../../types/sanity/home.queries";
import { createRouter } from "../context";

export const AboutRouter = createRouter().query("CV", {
  async resolve() {
    const CV = await sanityClient.fetch<Sanity.About.CV>(
      groq`*[_type== 'contributors' && name match 'Sander van Ast'] {
          name, 
          'file': business_file.asset->url
        }`
    );

    return CV[0];
  },
});
