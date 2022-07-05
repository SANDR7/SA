export default {
  name: "case_studies",
  title: "Case Studies",
  type: "document",
  fields: [
    //   Default values
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "project",
      title: "Project",
      type: "reference",
      to: [{ type: "projects" }],
    },
    {
      name: "responsibilities",
      title: "Responsibilities",
      description: "Role & Responsibilities",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "research",
      title: "Research",
      description: "Problem / Goals / Solution",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "User_persona",
      title: "User persona & journey",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    },
    {
      name: "User_flow",
      title: "User flow",
      type: "image",
    },
    {
      name: "wireframes_prototypes",
      title: "Wireframes & Prototype",
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
    },
    {
      name: "visual_design",
      title: "Visual design",
      type: "image",
    },
    {
      name: "test",
      title: "Test",
      description: "Usability test",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      project: "project.title",
    },
    prepare({ title, project }) {
      return {
        title: title,
        subtitle: project,
      };
    },
  },
};
