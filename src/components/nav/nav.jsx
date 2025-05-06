"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import About from "../about/about";
import { useEffect, useState } from "react";
import Menu from "../menu/menu";

const Nav = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const LocalTime = new Date(Date.now());
  const ParisTime = LocalTime.toLocaleTimeString("en-US", {
    timeZone: "Europe/Paris",
    hour12: false,
  });

  const linkColor = pathname.startsWith("/creative-agency/project")
    ? "#000"
    : "#fff";

  const isProjectPage = pathname.startsWith("/creative-agency/project");
  const isInspirationHubSubpage =
    pathname === "/inspiration-hub/get-dressed-and-go-out" ||
    pathname === "/inspiration-hub/get-your-space-in-shape" ||
    pathname === "/inspiration-hub/get-into-the-groove" ||
    pathname === "/inspiration-hub/get-into-the-mood";

  const backgroundColor = isProjectPage
    ? "#DADAD2"
    : isInspirationHubSubpage
    ? "#0A0A0A"
    : "transparent";

  useEffect(() => {
    const body = document.querySelector("body");
    if (isProjectPage) {
      body.style.background = "#DADAD2";
    } else if (isInspirationHubSubpage) {
      body.style.background = "#0A0A0A";
    } else {
      body.style.background = "#0A0A0A";
    }
  }, [pathname]);

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-35%)",
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const extraNavContent = [
    { title: "GD&GO", href: "/get-dressed-and-go-out" },
    { title: "GYSIS", href: "/get-your-space-in-shape" },
    { title: "GITG", href: "/get-into-the-groove" },
    { title: "GITM", href: "/get-into-the-mood" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-30">
        <ul className="relative px-6 py-5 flex items-center justify-between max-md:px-3 max-ds:items-start">
          {/* LOGO */}
          <li className="relative w-full flex items-center justify-start gap-20">
            <div className="flex flex-col">
              <Link
                href={"/"}
                className="logo-txt"
                style={{ color: linkColor }}
              >
                MAISON90
              </Link>
              {/* PARIS TIME */}
              <a
                className="n-txt uppercase  opacity-75 hidden max-ds:block"
                style={{ color: linkColor }}
              >
                {ParisTime} PARIS TIME
              </a>
            </div>
            {/* EXTRA CONTENT TEXT*/}
            <div className="relative w-fit flex items-center gap-8 max-ds:hidden">
              {pathname.startsWith("/inspiration-hub") &&
                extraNavContent.map((txt, i) => (
                  <a
                    className="n-txt uppercase text-nowrap opacity-75 cursor-pointer"
                    style={{ color: linkColor }}
                    key={i}
                    onClick={() =>
                      router.push("/inspiration-hub" + txt.href, {
                        onTransitionReady: slideInOut,
                      })
                    }
                  >
                    {txt.title}
                    {pathname === "/inspiration-hub" + txt.href && " +"}
                  </a>
                ))}
            </div>
          </li>

          {/* INSPIRATION HUB & CREATIVE AGENCY */}
          <li className="relative w-full flex items-center justify-center gap-20 max-lg:hidden">
            <a
              onClick={() =>
                router.push("/creative-agency", {
                  onTransitionReady: slideInOut,
                })
              }
              className={`n-txt uppercase  opacity-75 cursor-pointer
                ${!pathname.startsWith("/creative-agency") && "blur-[2px]"}`}
              style={{ color: linkColor }}
            >
              Creative Agency
            </a>
            <a
              onClick={() =>
                router.push("/inspiration-hub", {
                  onTransitionReady: slideInOut,
                })
              }
              className={`n-txt uppercase  opacity-75 cursor-pointer
                  ${!pathname.startsWith("/inspiration-hub") && "blur-[2px]"}`}
              style={{ color: linkColor }}
            >
              Inspiration Hub
            </a>
          </li>
          {/* ABOUT */}
          <li className="relative w-full flex items-center justify-end gap-8">
            <button
              className="n-txt uppercase  opacity-75 cursor-pointer max-ds:hidden"
              onClick={() => setShowAboutModal(!showAboutModal)}
              style={{ color: linkColor }}
            >
              About
            </button>
            <button
              className="n-txt uppercase  opacity-75 cursor-pointer hidden max-ds:block"
              onClick={() => setShowMenu(!showMenu)}
              style={{ color: linkColor }}
            >
              MENU
            </button>

            {/* PARIS TIME */}
            <a
              className="n-txt uppercase  opacity-75 max-ds:hidden"
              style={{ color: linkColor }}
            >
              {ParisTime} PARIS TIME
            </a>
          </li>
        </ul>
      </nav>

      <footer
        className="fixed bottom-0 w-full h-14 z-30"
        style={{ background: backgroundColor }}
      >
        <ul className="relative px-6 py-5 flex items-center justify-between max-md:px-3">
          <li className="relative w-full flex items-center justify-start gap-4">
            <button
              className="n-txt uppercase  border-b border-p"
              style={{
                borderBottom: `1px solid  ${linkColor}`,
                color: linkColor,
              }}
            >
              NL_ARCHIVES
            </button>
            <p className="n-txt uppercase" style={{ color: linkColor }}>
              BE INSPIRED
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Email"
                className={`w-[150px] h-5 pl-3 py-1 bg-transparent border border-p rounded-full font-acid-n text-p text-[.6rem] tracking-[.8px]
                 placeholder:${linkColor ? "text-t" : "text-p"} outline-none`}
                style={{ border: `1px solid  ${linkColor}`, color: linkColor }}
              />
              <button
                className="w-fit px-4 py-1 bg-[#3131310e] backdrop-blur-sm rounded-full font-acid-n text-p text-[.6rem] tracking-[.8px]"
                style={{ color: linkColor }}
              >
                Subscribe
              </button>
            </div>
          </li>
          <li className="relative w-[800px] flex items-center justify-center gap-8 max-lg:hidden max-ds:gap-4">
            <p className="n-txt uppercase " style={{ color: linkColor }}>
              The map
            </p>
            <p className="n-txt uppercase " style={{ color: linkColor }}>
              Spotify
            </p>
            <p className="n-txt uppercase " style={{ color: linkColor }}>
              Instagram
            </p>
          </li>
          <li className="relative w-full flex items-center justify-end gap-14 max-lg:hidden max-ds:gap-4">
            <p className="n-txt uppercase " style={{ color: linkColor }}>
              9 rue du Mont Thabor, 75001 Paris
            </p>
            <p className="n-txt uppercase " style={{ color: linkColor }}>
              © 2025 Maison90
            </p>
          </li>
        </ul>
      </footer>

      <About
        setShowAboutModal={setShowAboutModal}
        showAboutModal={showAboutModal}
      />
      <Menu
        setShowMenu={setShowMenu}
        showMenu={showMenu}
        setShowAboutModal={setShowAboutModal}
      />
    </>
  );
};

export default Nav;
