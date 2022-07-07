import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";

const Menu = () => {
  const { data } = trpc.useQuery(["sanity.CV"]);

  const router = useRouter();

  const isActive = (path: string) => {
    let active = "";

    if (router.pathname == path) {
      active = "dark:!text-black-text !text-white-text font-medium";
    } else {
      active = "";
    }
    return active.trim();
  };

  const routes = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Projects",
      link: "/projects",
    },
  ];

  return (
    <nav>
      <ul className="">
        {routes &&
          routes.map((route, idx) => (
            <li key={idx}>
              <Link href={route.link}>
                <a
                  title={`${route.name} link`}
                  aria-label={`${route.name} link`}
                >
                  {route.name}
                </a>
              </Link>
            </li>
          ))}
        <li className="">
          <button
            onClick={() => window.open(data.cv, "_blank")}
            title={"Download CV"}
          >
            CV
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
