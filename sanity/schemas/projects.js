export default {
  name: "projects",
  title: "Projects",
  type: "document",
  groups: [
    {
      name: "develop",
      title: "Dev specific",
    },
    {
      name: "design",
      title: "Design specific",
    },
  ],
  fields: [
    //   Default values
    {
      name: "title",
      title: "Title",
      description: "Name of client",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    {
      name: "thumbnail",
      title: "Thumbnail image",
      type: "image",
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      description: "write the case study",
      of: [{ type: "block" }],
    },
    {
      name: "date_delivered",
      title: "Date delivered",
      description: "Date when project went online",
      type: "date",
      options: {
        dateFormat: "DD MMMM YYYY",
        calendarTodayLabel: "Today",
      },
    },
    // for dev projects
    {
      name: "repository_url",
      title: "Repository url",
      description: "Github repository",
      type: "url",
      group: "develop",
    },
    {
      name: "website_online",
      title: "Website online",
      group: "develop",
      type: "boolean",
    },
    {
      name: "website_url",
      title: "Website url",
	  description: 'Hosted website link',
      type: "url",
      group: "develop",
      hidden: ({ document }) => !document?.website_online,
    },
    {
      name: "tech_stack",
      title: "Tech stack",
      description: "List of used techniques",
      type: "array",
      group: "develop",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    // for design projects
    {
      name: "dribbble_url",
      title: "Dribbble url",
      type: "url",
      group: "design",
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "design",
      of: [{ type: "image" }],
    },
  ],
};
