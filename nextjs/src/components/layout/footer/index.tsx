import { trpc } from "../../../utils/trpc";
import { AnimatedBars } from "../../ui/footer/NowPlayingAnimation";
import Anchor from "../../ui/section/anchor";

const Footer = () => {
  const { data: socials } = trpc.useQuery(["about.socials"]);
  const { data: nowPlaying } = trpc.useQuery(["about.now-playing"]);

  return (
    <footer className="bg-white-600 dark:bg-black-600 desktop:min-h-[200px] laptop:min-h-[150px] tablet:min-h-[130px] mobile:min-h-[250px]">
      <div className="maxWith flex desktop:py-[56px] laptop:py-[46px] tablet:py-[38px] justify-between mobile:py-[18px]">
        <ul className="socials flex laptop:gap-[11px] tablet:gap-[8px]  tiny:flex-col tablet:flex-row mobile:gap-[12px]">
          {!!socials &&
            socials.media.map((social) => (
              <li key={social.name}>
                <Anchor
                  href={social.link}
                  name={social.name}
                  className="laptop:p-[1rem] tablet:p-[.8rem] laptop:text-[18px] !text-white-800"
                  newTab
                />
              </li>
            ))}
        </ul>
        <div>
          {nowPlaying?.isPlaying ? (
            <div className="flex gap-2">
              <div className="flex flex-col text-right">
                <span className="font-semibold text-xl">
                  <Anchor
                    name={nowPlaying.title}
                    href={nowPlaying.songUrl}
                    className="hover:no-underline text-black dark:text-white"
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
                <span className="font-medium text-xl text-white-800">Not playing</span>
              </div>
              <i className="fa-brands fa-spotify pt-1 text-2xl text-[#18d985]"></i>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
