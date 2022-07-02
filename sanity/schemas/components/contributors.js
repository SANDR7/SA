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
		description: "Full name",
		type: "image",
	  },
    {
      name: "bio",
      title: "Bio",
      description: "Tell me about yourself",
      type: "markdown",
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
        subtitle: role.join(', '),
        media,
      };
    },
  },
};
