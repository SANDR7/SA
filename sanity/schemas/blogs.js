export default {
  name: "blogs",
  title: "Blogs",
  type: "document",
  fields: [
    //   Default values
    {
      name: "title",
      title: "Title",
      description: "Subjects name",
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
      name: "excerpt",
      title: "Excerpt",
      type: "string",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image" },
        {
          name: "projects",
          title: "Projects",
          type: "reference",
          to: { type: "projects" },
        },
      ],
    },
  ],
};
