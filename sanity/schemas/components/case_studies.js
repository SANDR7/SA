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
      name: 'role',
      title: 'Role',
      description: 'Developer, Product owner, Designer, Researcher',
      type: 'string',
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
      name: "concept",
      title: "Concept",
      descirption: 'diagrams / sketches',
      type: "image",
    },
    {
      name: "user_persona",
      title: "User persona & journey",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    },
    {
      name: "usability_test",
      title: "Usability Test",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "wireframes_prototypes",
      title: "Wireframes & Prototype",
      description: 'draft / low fidelity / high fidelity / functional ',
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
      validation: (Rule) => Rule.max(4).required(),
    },
    {
      name: "visual_design",
      title: "Visual design",
      description: 'Shareable visual UI graphic design',
      type: "image",
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
