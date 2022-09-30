/* eslint-disable @next/next/no-img-element */
import dayjs from "dayjs";
import React from "react";
import { Sanity } from "../../../../types/sanity/queries";
import Anchor from "../anchor";

const Posts: React.FC<Sanity.About.Posts> = ({
  title,
  createdAt,
  body,
  tags,
  excerpt,
  slug,
}) => {

  return (
    <>
      <div className="flex items-end justify-between border-b border-white-800 pb-[10px]">
        <h4 className="text-3xl font-bold">
          <Anchor
            href={`/post/${slug}`}
            name={title}
            title={title}
            className="text-black no-underline dark:text-white"
          />

          <span className="text-orange">.</span>
        </h4>
        <div className="flex gap-2">
          <span>{dayjs(createdAt).format("DD/MM/YYYY")}</span>
        </div>
      </div>
      <p className="min-h-[60px] pt-[5px] !normal-case">{excerpt}</p>
      {!!tags && (
        <div className="flex gap-4 pt-6">
          {tags?.map((tag: string, idx: number) => (
            <span
              key={idx}
              className="rounded-full bg-black p-3 py-1 text-white dark:bg-white dark:text-black"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <Anchor
        name={
          <img
            src="./assets/ArrowRight.png"
            className="py-4 transition-transform hover:translate-x-5"
            alt="scroll indicator"
          />
        }
        title={`Read more about: ${title}`}
        href={`/post/${slug}`}
      />
    </>
  );
};

export default Posts;
