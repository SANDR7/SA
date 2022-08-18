import React from "react";

const Callout: React.FC<{
  subTitle: string;
  description?: string | React.ReactNode;
  children: React.ReactNode;
}> = ({ subTitle, description, children }) => {
  return (
    <>
      <span
        className="text-[48px] font-bold text-white-600
            dark:text-black-600

            tablet:text-[62px]

            laptop:text-[92px]

            desktop:text-[144px]
        "
      >
        {subTitle}
      </span>
      <span
        className="relative 
      
          left-[0rem] top-[-1.8rem]

          tablet:left-[.8rem] tablet:top-[-2.2rem]

          laptop:left-[1rem] laptop:top-[-3.2rem] 

          desktop:left-[6rem] desktop:top-[-6rem]
        "
      >
        <h2
          className="text-[28px] 
          font-bold leading-[1.3]

          tablet:w-11/12 tablet:text-[40px]  tablet:leading-none tablet:w-full

          laptop:text-[56px] laptop:w-10/12

          desktop:text-[76px]
           "
        >
          {children}
        </h2>
        <p className="mt-4 opacity-70 tablet:w-8/12 desktop:w-5/12">
          {description}
        </p>
      </span>
    </>
  );
};

export default Callout;
