/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { Sanity } from "../../../../types/sanity/queries";

import Anchor from "../anchor";

const ProjectCard: React.FC<Sanity.Projects.Home> = ({
  _id,
  title,
  slug,
  tags,
  excerpt,
  type,
  production_link,
  thumbnail,
}) => {
  return (
    <>
      <div className="laptop:w-11/12 desktop:w-9/12">
        <div className="flex items-stretch font-medium leading-[1.1] tablet:h-[100px] laptop:h-[123px] desktop:h-[154px]">
          <h4
            className="self-end 
                          text-[38px]
                          tablet:text-[62px]
                          laptop:text-[58px]
                          desktop:text-[76px]
                          "
          >
            {title}
            <span className="font-bold text-orange">.</span>
          </h4>
        </div>
        <div
          className="my-[10px] ml-[15px] 
        flex flex-col
        border-l py-1 pl-[20px] tablet:my-[15px]
        tablet:ml-[50px] tablet:pl-[40px] laptop:my-[6px]
        laptop:ml-[35px] laptop:pl-[30px] desktop:my-[10px]
        desktop:ml-[65px] desktop:w-10/12 desktop:pl-[40px]
        "
        >
          {!!tags && (
            <div>
              <span className="capitalize text-green">{tags.join(" // ")}</span>
            </div>
          )}
          <p
            className="min-h-[80px] tablet:min-h-[90px]
                        laptop:min-h-[120px]
                        desktop:min-h-[120px]
                        desktop:text-[18px]
          "
          >
            {excerpt}
          </p>
          <strong className="uppercase text-white-800 desktop:mt-[80px]">
            {type === "graphic" ? "graphic design" : type}
          </strong>
          <Anchor
            name={
              <div className="flex gap-2 group/link">
              view case
              <img
                src="./assets/ArrowRight.png"
                className="py-2 transition-transform group-hover/link:translate-x-5"
                alt="scroll indicator"
                />
                </div>
            }
            title={`Case study of ${title}`}
            href={`case/${slug}`}
          />
        </div>
      </div>
      <Anchor
        name={
          <Image
            src={thumbnail.image}
            alt={thumbnail.caption}
            width={1200}
            height={800}
            title={`view demo of ${title}`}
            className="w-max transition-[filter]
              ease-in-out group-hover:saturate-100

              dark:brightness-[.8]
              
              mobile:saturate-100
            
              laptop:saturate-0"
            objectFit="cover"
          />
        }
        href={production_link.find((link) => link) as string}
        title={`${title} website`}
        newTab
      />
    </>
  );
};

export default ProjectCard;
