const HeaderTitle = ({ name, className }: { name: string, className?: string }) => {
  return (
    <h1
      className={`absolute bottom-[-.5rem] 
      overflow-hidden
      text-[36px]
      
      font-semibold leading-none
      text-orange opacity-[80%]

      tiny:hidden
      mobile:block 
      
      tablet:bottom-[-.6rem]
      tablet:text-[52px] 
      
      desktop:bottom-[-1.2rem]
      desktop:text-[96px] 
      ${className}
     `}
    >
      {name}
    </h1>
  );
};

export default HeaderTitle;
