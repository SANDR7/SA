import Head from "next/head";
import React from "react";
import Menu from "./header/menu";
import HeaderTitle from "./header/name";

interface PageProps {
  title: string | undefined;
  description: string | undefined;
  image: string | undefined;
  keywords: string[] | undefined;
  children: React.ReactNode;
}

const CaseContainer: React.FC<PageProps> = (props) => {
  const { title, description, image, keywords, children } = props;
  return (
    <>
      <Head>
        <title>
          {`Case study — ${title} | Sander van Ast` ??
            "Sander van Ast — Website"}
        </title>

        <meta name="keywords" content={keywords?.join(", ")} />

        {/* facebook metas */}
        <meta
          property="og:title"
          content={`Case study — ${title} | Sander van Ast`}
        />
        <meta
          property="og:site_name"
          content={`Case study — ${title} | Sander van Ast`}
        />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />

        {/* twitter metas */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:description" content={description} />
      </Head>

      <header>
        <div className="maxWith py-[2rem]">
          <Menu />
        </div>
        <div className="maxWith relative z-10">
          <HeaderTitle name="Work in progress" />
        </div>
      </header>

      <main className="relative z-20 bg-white dark:bg-black">
        <div className="maxWith overflow-hidden py-[3rem]">{children}</div>
      </main>
    </>
  );
};

export default CaseContainer;
