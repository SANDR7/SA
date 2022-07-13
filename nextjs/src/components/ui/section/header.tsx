import React from "react";

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h3 className="p-[10px] py-[5px] tablet:py-[10px] border-l my-5">
      {title}
    </h3>
  );
};

export default SectionHeader;
