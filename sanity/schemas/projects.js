import showField from "../functions/validation";

export default {
  name: "projects",
  title: "Projects",
  type: "document",
  groups: [
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    //   Default values
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "seo",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "seo",
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "client",
      title: "Client",
      description: "Name of client",
      type: "string",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "string",
      group: "seo",
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      group: "seo",
      of: [{ type: "string" }],
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      group: "seo",
      options: {
        hotspot: true, // <-- Defaults to false
      },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "Caption",
          options: {
            isHighlighted: true, // <-- make this field easily accessible
          },
        },
        {
          // Editing this field will be hidden behind an "Edit"-button
          name: "attribution",
          type: "string",
          title: "Attribution",
        },
      ],
    },
    {
      title: "Finished date",
      name: "finished_date",
      type: "date",
      options: {
        dateFormat: "MMMM YYYY",
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "gallery",
      title: "Gallery",
      description: "Context images showing the progress",
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
    },
    {
      name: "case_study",
      title: "Case study",
      type: "reference",
      to: [{ type: "case_studies" }],
    },
    {
      title: "Summery",
      name: "summery",
      description: "Explain what the project is about",
      type: "markdown",
    },
    {
      name: "likes",
      title: "Likes",
      type: "number",
      initialValue: 0,
    },
    {
      name: "contributors",
      title: "Contributors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "contributors" }] }],
    },
    // {
    //   name: 'public',
    //   title: 'Public?',
    //   description: 'show Item on portfolio website',
    //   type: 'boolean',
    // },
    {
      name: "type",
      title: "Type",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { value: "website", title: "Website" },
          { value: "graphic", title: "Graphic" },
          { value: "brand", title: "Brand" },
        ],
      },
      validation: (Rule) => Rule.max(1).required(),
    },
    // Website inputs
    {
      title: "Live link",
      name: "live_link",
      description: "Hosted website link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
      hidden: ({ document }) => {
        return showField(document, "website");
      },
    },
    {
      title: "Open source?",
      name: "open_source",
      type: "boolean",
      hidden: ({ document }) => {
        return showField(document, "website");
      },
    },
    {
      title: "Repository link",
      name: "repo_link",
      description: "Git source link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
      hidden: ({ document }) => {
        const type = showField(document, "website");
        const openSource = !document?.open_source;

        return type ? true : openSource ? true : false;
      },
    },
    {
      name: "used_tech",
      title: "Used skills",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skills" }] }],
      hidden: ({ document }) => {
        return showField(document, "website");
      },
      validation: (Rule) => Rule.max(6).unique(),
    },
    // Graphic inputs
    {
      title: "Saved link",
      name: "saved_link",
      description: "Source link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
        }),
      hidden: ({ document }) => {
        return showField(document, "graphic");
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      hidden: ({ document }) => {
        return showField(document, "graphic");
      },
    },

    // Brand inputs
    {
      title: "Client link",
      name: "client_link",
      description: "Company website",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
      hidden: ({ document }) => {
        return showField(document, "brand");
      },
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "reference", to: [{ type: "comments" }] }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      type: "type",
    },
    prepare: ({ title, media, type }) => {
      return {
        title,
        subtitle: type[0],
        media,
      };
    },
  },
};
