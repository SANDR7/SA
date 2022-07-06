import { createClient, createPreviewSubscriptionHook } from "next-sanity";

const config = {
  projectId:  process.env.SANITY_PROJECT_ID as string,
  dataset: process.env.SANITY_DATASET as string,
  apiVersion: '2022-07-06', //YYYY-MM-DD
  useCdn: false,
};

export const sanityClient = createClient(config);
export const usePreviewSubscription = createPreviewSubscriptionHook(config);
