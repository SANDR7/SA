import React from "react";

const SectionHeader: React.FC<{ title: string; isText?: boolean; className?: string; }> = ({
  title,
  className,
  isText = false,
}) => {
  if (isText) {
    return (
      <p className={`my-5 border-l p-[10px] py-[5px] tablet:py-[10px] ${className}`}>
        {title}
      </p>
    );
  }

  return (
    <h3 className={`my-5 border-l p-[10px] py-[5px] tablet:py-[10px] ${className}`}>
      {title}
    </h3>
  );
};

export default SectionHeader;
