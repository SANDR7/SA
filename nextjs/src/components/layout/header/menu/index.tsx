import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import Avatar from "../../../ui/header/avatar";
import Anchor from "../../../ui/section/anchor";

interface NavItemProps {
  href: string;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, text }) => {
  const router = useRouter();

  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <a
        className={`mr-[1rem] rounded p-2 hover:bg-white dark:hover:bg-black desktop:p-3 ${
          isActive
            ? "font-medium !text-white-text dark:!text-black-text"
            : "text-white-800"
        }`}
        title={`${text} link`}
        aria-label={`${text} link`}
      >
        {text}
      </a>
    </Link>
  );
};

const Menu = () => {
  const { data } = trpc.useQuery(["about.CV"]);

  const routes = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Projects",
      link: "/projects",
    },
    {
      name: "About",
      link: "/about",
    },
  ];

  return (
    <nav className="flex justify-between">
      <ul className="flex items-center tablet:items-start">
        {routes &&
          routes.slice(0, 3).map((route, idx) => (
            <li
              key={idx}
              className="text-[16px] tablet:text-[20px] laptop:text-[24px]"
            >
              <NavItem href={route.link} text={route.name} />
            </li>
          ))}
        <li className="tiny:block mobile:hidden tablet:block tablet:text-[20px] laptop:text-[24px]">
          <Anchor
            href={data?.file as string}
            name="CV"
            className="cursor-pointer rounded p-2 text-red hover:bg-white hover:!no-underline dark:hover:bg-black desktop:p-3"
            newTab
          />
        </li>
      </ul>
      <Avatar portrait="/web/profile.png" avatar="/web/avatar.png" />
    </nav>
  );
};

export default Menu;
