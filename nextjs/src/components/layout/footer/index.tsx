import { trpc } from "../../../utils/trpc";
import Anchor from "../../ui/section/anchor";

const Footer = () => {
  const { data: socials } = trpc.useQuery(["about.socials"]);

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
        <div className="spotify">test</div>
      </div>
    </footer>
  );
};

export default Footer;
