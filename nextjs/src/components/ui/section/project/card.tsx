import Image from "next/image";
import React from "react";

import { Sanity } from "../../../../types/sanity/home.queries";
import Anchor from "../anchor";

const ProjectCard: React.FC<Sanity.Projects.Home> = ({
  _id,
  title,
  slug,
  excerpt,
  type,
  production_link,
  thumbnail,
}) => {
  return (
    <>
      <div className="desktop:w-9/12 laptop:w-11/12">
        <div className="desktop:h-[154px] laptop:h-[123px] tablet:h-[100px] font-medium flex items-stretch leading-[1.1]">
          <h4
            className="self-end 
                          desktop:text-[76px]
                          laptop:text-[58px]
                          tablet:text-[62px]
                          text-[38px]
                          "
          >
            {title}
            <span className="text-orange font-bold">.</span>
          </h4>
        </div>
        <div
          className="flex flex-col 
        border-l
        desktop:my-[10px] desktop:pl-[40px] desktop:w-10/12 desktop:ml-[65px]
        laptop:my-[6px] laptop:pl-[30px] laptop:ml-[35px]
        tablet:my-[15px] tablet:pl-[40px] tablet:ml-[50px]
        my-[10px] pl-[20px] ml-[15px]
        "
        >
          <p
            className="desktop:min-h-[120px] desktop:text-[18px]
                        laptop:min-h-[120px]
                        tablet:min-h-[90px]
                        min-h-[80px]
          "
          >
            {excerpt}
          </p>
          <strong className="uppercase text-orange desktop:mt-[80px]">
            {type === "graphic" ? "graphic design" : type}
          </strong>
          <Anchor
            name="Read more"
            className="w-max"
            href={`case/${slug}`}
          />
        </div>
      </div>
      <Image
        src={thumbnail.image}
        alt={thumbnail.caption}
        width={1200}
        height={800}
        className="w-max aspect-4/3
                    group-hover:saturate-100

                    mobile:saturate-100
                    
                    laptop:saturate-0
                  
                    dark:brightness-[.8]"
        objectFit="cover"
      />
    </>
  );
};

export default ProjectCard;
