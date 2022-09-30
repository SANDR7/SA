import React from "react";

const ColumnItem: React.FC<any> = ({ ...column }) => {
  console.log([column]);

  switch (
    column.design ||
    column.tasks ||
    column.testing ||
    column.persona ||
    column.research ||
    column.wireframes ||
    column.userflow
  ) {
    case column.design:
      return <p>design</p>;
    case column.tasks:
      return <p>tasks</p>;
    case column.testing:
      return <p>testing</p>;
    case column.persona:
      return <p>persona</p>;
    case column.research:
      return <p>research</p>;
    case column.wireframes:
      return <p>wireframes</p>;
    case column.userflow:
      return <p>userflow</p>;

    default:
      return <p>nothing</p>;
  }

  // return <pre>{JSON.stringify(column, null, 2)}</pre>;
};

export default ColumnItem;
