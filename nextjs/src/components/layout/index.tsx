import Head from "next/head";
import React from "react";
import { meta } from "../../utils/meta";
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
        <div className="maxWith pt-[55px]">
          <Menu />
        </div>
        <div className="maxWith">
          <HeaderTitle name={meta.name} />
        </div>
      </header>

      <main className="bg-white dark:bg-black -translate-y-[3.3rem]">
        <div className="maxWith py-[3rem]">{children}</div>
      </main>
    </>
  );
};

export default PageContainer;
