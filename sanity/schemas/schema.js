// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import about from "./about";
import blogs from "./blogs";
import skills from "./components/skills";
import projects from "./projects";
import contributors from "./components/contributors";
import case_studies from "./components/case_studies";
import comments from "./components/comments";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    projects,
    case_studies,
    comments,
    blogs,
    skills,
    contributors,
  ]),
});
