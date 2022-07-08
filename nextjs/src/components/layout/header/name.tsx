const HeaderTitle = ({ name }: { name: string }) => {
  return (
    <h2
      className="absolute leading-none font-medium overflow-hidden opacity-[75%]
     text-orange

     text-[36px]
    bottom-[-.5rem] 
     
     
     desktop:text-[96px]
     desktop:bottom-[-1.2rem] 
     "
    >
      {name}
    </h2>
  );
};

export default HeaderTitle;
