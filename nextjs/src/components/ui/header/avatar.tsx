import Image from "next/image";

interface Avatar {
  avatar: string;
  portrait: string;

  avatar_social_link?: string;
  portrait_social_link?: string;
}

const Avatar: React.FC<Avatar> = (props) => {
  const { avatar, portrait, avatar_social_link, portrait_social_link } = props;
  return (
    <div className="relative max-w-[63px] tiny:hidden mobile:block tablet:max-w-[95px] desktop:max-w-[204px]">
      <div>
        <a
          href={
            portrait_social_link ??
            "https://www.linkedin.com/in/sander-van-ast/"
          }
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={portrait}
            alt="Sander portrait"
            priority
            width={204}
            height={204}
            objectFit="contain"
          />
        </a>
      </div>
      <div className="absolute bottom-0 left-0 max-w-[24px] tablet:max-w-[40px] desktop:max-w-[77px]">
        <a
          href={avatar_social_link ?? "https://github.com/SANDR7"}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={avatar}
            alt="Sander avatar"
            priority
            width={77}
            height={77}
            objectFit="contain"
          />
        </a>
      </div>
    </div>
  );
};

export default Avatar;
