import React from "react";

const Callout: React.FC<{
  subTitle: string;
  description?: string;
children: React.ReactNode
}> = ({ subTitle, description,  children }) => {
  return (
    <>
      <span
        className="font-bold text-white-600 dark:text-black-600
            text-[48px]

            tablet:text-[62px]

            laptop:text-[92px]

            desktop:text-[144px]
        "
      >
        {subTitle}
      </span>
      <span
        className={`relative 
      
          left-[0rem] top-[-1.8rem]

          tablet:left-[.8rem] tablet:top-[-2.2rem]

          laptop:left-[1rem] laptop:top-[-3.2rem]

          desktop:left-[6rem] desktop:top-[-6rem]
        `}
      >
        <h2
          className="font-bold 
            leading-9 text-[28px]

            tablet:leading-[.9] tablet:text-[40px]

            laptop:text-[56px] laptop:leading-[1]

            desktop:text-[76px] desktop:w-auto desktop:leading-none
           "
        >
          {children}
        </h2>
        <p className="tablet:w-8/12 desktop:w-4/12 opacity-70 mt-4">
          {description}
        </p>
      </span>
    </>
  );
};

export default Callout;
