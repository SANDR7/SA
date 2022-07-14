import { trpc } from "../../../utils/trpc";
import { AnimatedBars } from "../../ui/footer/NowPlayingAnimation";
import Anchor from "../../ui/section/anchor";

const Footer = () => {
  const { data: socials } = trpc.useQuery(["about.socials"]);
  const { data: nowPlaying } = trpc.useQuery(["about.now-playing"]);

  return (
    <footer className="bg-white-600 dark:bg-black-600 desktop:min-h-[200px]">
      <div className="maxWith tablet:flex desktop:py-[56px] tablet:justify-between">
        <ul className="socials tablet:flex desktop:gap-[11px]">
          {!!socials &&
            socials.media.map((social) => (
              <li key={social.name}>
                <Anchor
                  href={social.link}
                  name={social.name}
                  className="desktop:p-[1rem] !text-white-800"
                  newTab
                />
              </li>
            ))}
          <li></li>
        </ul>
        <div className="spotify">
          {nowPlaying?.isPlaying ? (
            <div className="flex gap-2">
              <div className="flex flex-col text-right">
                <span className="font-semibold text-xl">
                  <Anchor
                    name={nowPlaying.title}
                    href={nowPlaying.songUrl}
                    className="hover:text-gray-dark  dark:hover:text-gray-light"
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
                <span className="font-semibold text-xl">Not playing</span>
                <span className="font-thin">Spotify</span>
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
