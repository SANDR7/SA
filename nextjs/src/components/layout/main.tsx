import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

import { meta } from "../../data/meta";
import Menu from "./header/menu";
import HeaderTitle from "./header/name";

const Footer = dynamic(() => import("./footer"));

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const PageContainer: React.FC<PageProps> = (props) => {
  const { title, children } = props;
  return (
    <>
      <Head>
        <title>{title ?? "Sander van Ast — Website"}</title>
      </Head>

      <header>
        <div className="maxWith py-[2rem]">
          <Menu />
        </div>
        <div className="maxWith relative z-10">
          <HeaderTitle name={meta.name} />
        </div>
      </header>

      <main className="relative z-20 bg-white dark:bg-black">
        <div className="maxWith overflow-hidden py-[3rem]">{children}</div>
      </main>

      <Footer />
    </>
  );
};

export default PageContainer;
