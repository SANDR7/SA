import { createClient, createPreviewSubscriptionHook } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: process.env.SANITY_PROJECT_ID || "pglct6t7",
  dataset: process.env.SANITY_DATASET as string,
  apiVersion: "2022-07-06", //YYYY-MM-DD
  useCdn: false,
};

export const sanityClient = createClient(config);
export const usePreviewSubscription = createPreviewSubscriptionHook(config);
 const builder = imageUrlBuilder({
   dataset: "production",
   projectId: "pglct6t7",
 });
export function urlFor(source: any) {
  return builder.image(source);
}


