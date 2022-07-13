import Head from "next/head";
import React from "react";
import { meta } from "../../data/meta";
import Menu from "./header/menu";
import HeaderTitle from "./header/name";

interface PageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const CaseContainer: React.FC<PageProps> = (props) => {
  const { title, description, children } = props;
  return (
    <>
      <Head>
        <title>{`Case study — ${title} | Sander van Ast` ?? "Sander van Ast — Website"}</title>
		<meta name="description" content={description} />
      </Head>

      <header className="bg-white-600 dark:bg-black-600">
        <div className="maxWith py-[2rem]">
          <Menu />
        </div>
        <div className="maxWith relative z-10">
          <HeaderTitle name={title} />
        </div>
      </header>

      <main className="bg-white dark:bg-black relative z-20 ">
        <div className="maxWith py-[3rem] overflow-hidden">{children}</div>
      </main>
    </>
  );
};

export default CaseContainer;
