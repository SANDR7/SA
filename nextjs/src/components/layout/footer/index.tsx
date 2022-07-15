import { trpc } from "../../../utils/trpc";
import { AnimatedBars } from "../../ui/footer/NowPlayingAnimation";
import Anchor from "../../ui/section/anchor";

const Footer = () => {
  const { data: socials } = trpc.useQuery(["about.socials"]);
  const { data: nowPlaying } = trpc.useQuery(["about.now-playing"]);

  return (
    <footer className="bg-white-600 dark:bg-black-600 mobile:min-h-[250px] tablet:min-h-[130px] laptop:min-h-[150px] desktop:min-h-[200px]">
      <div className="maxWith flex justify-between mobile:py-[18px] tablet:py-[38px] laptop:py-[46px] desktop:py-[56px]">
        <ul className="socials flex tiny:flex-col mobile:gap-[12px]  tablet:flex-row tablet:gap-[8px] laptop:gap-[11px]">
          {!!socials &&
            socials.media.map((social) => (
              <li key={social.name}>
                <Anchor
                  href={social.link}
                  name={social.name}
                  className="!text-white-800 tablet:p-[.8rem] laptop:p-[1rem] laptop:text-[18px]"
                  newTab
                />
              </li>
            ))}
        </ul>
        <div>
          {nowPlaying?.isPlaying ? (
            <div className="flex gap-2">
              <div className="flex flex-col text-right">
                <span className="text-xl font-semibold">
                  <Anchor
                    name={nowPlaying.title}
                    href={nowPlaying.songUrl}
                    className="text-black hover:no-underline dark:text-white"
                    newTab
                  />
                </span>
                <span className="font-thin">{nowPlaying.artist}</span>
              </div>

              <AnimatedBars />
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="flex flex-col text-right">
                <span className="text-xl font-medium text-white-800">
                  Not playing
                </span>
              </div>
              <i className="fa-brands fa-spotify py-1 text-2xl text-[#18d985] hover:animate-spin"></i>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
