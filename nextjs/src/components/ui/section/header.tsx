import React from "react";

const SectionHeader: React.FC<{ title: any; name?: string; isText?: boolean; className?: string; }> = ({
  title,
  className,
  name,
  isText = false,
}) => {
  if (isText || name) {
    return (
      <p className={`my-5 border-l p-[10px] py-[2px] tablet:py-[6px] ${className}`}>
        <div className="font-bold capitalize">{name}</div>
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
