export default {
	name: "comments",
	title: "Comments",
	type: "document",
	fields: [
	  //   Default values
	  {
		name: "text",
		title: "Text",
		type: "string",
	  },
	  {
		name: 'project',
		title: 'Project',
		type: 'reference',
		to: [{ type: 'projects' }],
	  },
	],
	preview: {
		select: {
		  text: "text",
		  project: 'project.title'
		},
		prepare: ({ text, project }) => {
		  return {
			title: text,
			subtitle: project,
		  };
		},
	  },
}