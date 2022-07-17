import Image from "next/image";
import React from "react";
import { Sanity } from "../../../../types/sanity/queries";
import Anchor from "../anchor";

const Skill: React.FC<Sanity.About.SkillsData> = ({
  name,
  logo,
  link,
  type,
}) => {
  return (
    <span key={name} className="mb-3 flex w-3/4 flex-col items-center">
      <Anchor
        name={
          <Image src={logo.image} alt={`${name} logo`} height={60} width={60} />
        }
        newTab
        className="h-[55px] w-[55px] saturate-0 duration-[400ms] hover:scale-90 hover:saturate-100 dark:brightness-[.8]"
        href={link as string}
      />
      <p
        className={`my-5 w-1/2 border-t py-[5px] text-center mobile:w-10/12  ${
          (type == "language" && "border-orange") ||
          (type == "tool" && "border-blue") ||
          (type == "program" && "border-green")
        } tablet:py-[10px]`}
      >
        {name}
      </p>
    </span>
  );
};

export default Skill;
