import Head from "next/head";
import React from "react";
import { meta } from "../../utils/meta";
import Avatar from "../ui/header/avatar";
import Menu from "./header/menu";
import HeaderTitle from "./header/name";

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

      <header className="bg-white-600 dark:bg-black-600">
        <div className="maxWith py-[2rem]">
          <Menu />
        </div>
        <div className="maxWith relative z-10">
          <HeaderTitle name={meta.name} />
        </div>
      </header>

      <main className="bg-white dark:bg-black relative z-20">
        <div className="maxWith py-[3rem] ">{children}</div>
      </main>
    </>
  );
};

export default PageContainer;
