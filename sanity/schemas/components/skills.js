export default {
  name: "skills",
  title: "Skills",
  type: "document",
  fields: [
    //   Default values
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      title: "Website link",
      name: "link",
      description: "Website of the organization / company",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
        }),
    },
    {
      name: "type",
      title: "Type",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { value: "program", title: "Software program" },
          { value: "language", title: "Programming language" },
          { value: "tool", title: "Development Tool" },
        ],
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
	  of: [{type: 'string'}],
      options: {
        layout: "tags",
      },
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: 'logo',
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
