import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";
import Avatar from "../../../ui/header/avatar";

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
        className={`mr-[1rem] rounded desktop:p-3 p-2 hover:bg-white dark:hover:bg-black ${
          isActive
            ? "dark:!text-black-text !text-white-text font-medium"
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
  const { data } = trpc.useQuery(["sanity.CV"]);

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
      <ul className="flex items-center">
        {routes &&
          routes.slice(0, 3).map((route, idx) => (
            <li
              key={idx}
              className="text-[16px] tablet:text-[20px] laptop:text-[24px]"
            >
              <NavItem href={route.link} text={route.name} />
            </li>
          ))}
        <li className="tablet:text-[20px] laptop:text-[24px] hidden tablet:block">
          <button
            onClick={() => window.open(data.file, "_blank")}
            title={"Download CV"}
            className="rounded text-red desktop:p-3 p-2 hover:bg-white"
          >
            CV
          </button>
        </li>
      </ul>
      <Avatar portrait="/web/profile.png" avatar="/web/avatar.png" />
    </nav>
  );
};

export default Menu;
