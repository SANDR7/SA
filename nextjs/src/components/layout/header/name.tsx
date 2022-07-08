const HeaderTitle = ({ name }: { name: string }) => {
  return (
    <h1
      className="absolute leading-none 
      overflow-hidden opacity-[80%]
      font-medium text-orange

      text-[36px]
      bottom-[-.5rem] 
      
      tablet:text-[52px]
      tablet:bottom-[-.6rem] 
      
      desktop:text-[96px]
      desktop:bottom-[-1.2rem] 
     "
    >
      {name}
    </h1>
  );
};

export default HeaderTitle;
