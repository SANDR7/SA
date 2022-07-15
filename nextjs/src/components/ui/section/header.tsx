import React from "react";

const SectionHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h3 className="my-5 border-l p-[10px] py-[5px] tablet:py-[10px]">
      {title}
    </h3>
  );
};

export default SectionHeader;
