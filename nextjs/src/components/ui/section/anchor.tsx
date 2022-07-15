import Link from "next/link";
import React from "react";

const Anchor: React.FC<{
  name: string | React.ReactNode;
  href: string;
  title?: string;
  className?: string;
  newTab?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}> = ({ name, className, href, newTab, title, onClick }) => {
  const defaultStyle = "capitalize text-red hover:underline";

  if (newTab)
    return (
      <a
        href={href}
        className={`${className} ${defaultStyle}`}
        title={title}
        rel="noreferrer"
        target={"_blank"}
      >
        {name}
      </a>
    );

  return (
    <Link href={href}>
      <a className={`${className} ${defaultStyle}`} title={title?.toLowerCase()}>
        {name}
      </a>
    </Link>
  );
};

export default Anchor;
