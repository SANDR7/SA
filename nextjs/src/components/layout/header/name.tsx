const HeaderTitle = ({ name }: { name: string }) => {
  return (
    <h1
      className="absolute bottom-[-.5rem] 
      overflow-hidden
      text-[36px]
      
      font-medium leading-none
      text-orange opacity-[80%]

      tiny:hidden
      mobile:block 
      
      tablet:bottom-[-.6rem]
      tablet:text-[52px] 
      
      desktop:bottom-[-1.2rem]
      desktop:text-[96px] 
     "
    >
      {name}
    </h1>
  );
};

export default HeaderTitle;
