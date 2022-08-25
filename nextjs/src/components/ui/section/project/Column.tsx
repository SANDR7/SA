import { PortableText } from "@portabletext/react";
import React from "react";

const ColumnItem: React.FC<any> = ({
  research,
  responsibilities,
  User_persona,
}) => {
  console.log("res", research);

  switch (research || responsibilities || User_persona) {
    case research:
      return <PortableText value={research} />;
    case User_persona:
      return <PortableText value={User_persona} />;
    case responsibilities:
      return <PortableText value={responsibilities} />;

    default:
      return null;
  }
};

export default ColumnItem;
