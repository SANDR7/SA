export default {
  name: "contributors",
  title: "Contributors",
  type: "document",
  fields: [
    //   Default values
    {
      name: "name",
      title: "Name",
      description: "Full name",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "profile",
      title: "Profile picture",
      type: "image",
    },
    {
      name: 'business_file',
      title: 'Business file',
      type: 'file',
    },
    {
      name: "bio",
      title: "Bio",
      description: "Tell me about yourself",
      type: "markdown",
    },
    {
      name: "socials",
      title: "Social media",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
			  { name: "name", title: "Platform name", type: "string" },
            { name: "username", title: "Username", type: "string" },
            {
              name: "link",
              title: "Link",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["https"],
                }),
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "profile",
      role: "role",
    },
    prepare: ({ title, media, role }) => {
      return {
        title,
        subtitle: role.join(", "),
        media,
      };
    },
  },
};
