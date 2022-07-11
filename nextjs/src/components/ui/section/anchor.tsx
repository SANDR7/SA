import Link from "next/link";
import React from "react";

const Anchor: React.FC<{
  name: string;
  href: string;
  className?: string;
  newTab?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}> = ({ name, className, href, newTab, onClick }) => {
  const defaultStyle = "text-red capitalize";

  if (newTab)
    return (
      <a
        href={href}
        className={`${className} ${defaultStyle}`}
        rel="noreferrer"
        target={"_blank"}
      >
        {name}
      </a>
    );

  return (
    <Link href={href as string}>
      <a className={`${className} ${defaultStyle}`}>{name}</a>
    </Link>
  );
};

export default Anchor;
