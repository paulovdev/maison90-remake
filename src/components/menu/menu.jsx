"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

const Menu = ({ setShowMenu, showMenu, setShowAboutModal }) => {
  const router = useTransitionRouter();
  const pathname = usePathname();

  const menuAnimation = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.74, 0, 0.14, 1],
      },
    },
    close: {
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.74, 0, 0.14, 1],
      },
    },
  };

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

  const isProjectPage = pathname.startsWith("/creative-agency/project");
  const backgroundColor = isProjectPage ? "#0A0A0A" : "#DADAD2";
  const linkColor = pathname.startsWith("/creative-agency/project")
    ? "#fff"
    : "#000";

  return (
    <AnimatePresence>
      {showMenu && (
        <motion.div
          className="fixed inset-0 w-screen h-screen bg-[#D7D7D0] z-50 select-none hidden max-ds:block"
          style={{ background: backgroundColor }}
          variants={menuAnimation}
          initial="close"
          animate={showMenu ? "open" : "close"}
          exit="close"
          key={showMenu}
        >
          <div
            className="absolute top-2 right-4 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <span className="n-txt uppercase" style={{ color: linkColor }}>
              CLOSE
            </span>
          </div>

          <div className="size-full flex flex-col justify-between">
            <div className="size-full flex justify-center items-center gap-20 max-md:flex-col max-md:gap-0">
              <a
                onClick={() => {
                  router.push("/creative-agency", {
                    onTransitionReady: slideInOut,
                  });
                  setShowMenu(false);
                }}
                className={`h-[100px] font-acid-r text-[.9rem] tracking-[.5px] opacity-75 uppercase cursor-pointer
                ${!pathname.startsWith("/creative-agency") && "blur-[2px]"}`}
                style={{ color: linkColor }}
              >
                Creative Agency
              </a>
              <div className="h-[100px] flex flex-col max-md:h-[1px]">
                <a
                  onClick={() => {
                    router.push("/inspiration-hub", {
                      onTransitionReady: slideInOut,
                    });
                    setShowMenu(false);
                  }}
                  className={`mb-6 l-txt uppercase cursor-pointer
                  ${!pathname.startsWith("/inspiration-hub") && "blur-[2px]"}`}
                  style={{ color: linkColor }}
                >
                  Inspiration Hub
                </a>
                <div className="h-[100px] flex flex-col items-start gap-4">
                  {extraNavContent.map((txt, i) => (
                    <a
                      className="n-txt uppercase cursor-pointer"
                      key={i}
                      onClick={() => {
                        router.push("/inspiration-hub" + txt.href, {
                          onTransitionReady: slideInOut,
                        });
                        setShowMenu(false);
                      }}
                      style={{ color: linkColor }}
                    >
                      {txt.title}
                      {pathname === "/inspiration-hub" + txt.href && " +"}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-24 my-20 flex items-end justify-between max-md:px-6">
              <button
                className="n-txt uppercase cursor-pointer"
                onClick={() => {
                  setShowMenu(false);
                  setShowAboutModal(true);
                }}
                style={{ color: linkColor }}
              >
                about
              </button>
              <div className="flex items-end gap-8">
                <div>
                  <h2
                    className="mt-8 mb-4 lb-txt uppercase"
                    style={{ color: linkColor }}
                  >
                    TOOLS
                  </h2>
                  <ul className="">
                    <li
                      className="n-txt uppercase "
                      style={{ color: linkColor }}
                    >
                      The map
                    </li>
                    <li
                      className="n-txt uppercase "
                      style={{ color: linkColor }}
                    >
                      Spotify
                    </li>
                  </ul>
                </div>
                <div>
                  <h2
                    className="mt-8 mb-4 lb-txt uppercase"
                    style={{ color: linkColor }}
                  >
                    Socials
                  </h2>
                  <ul className="n-txt uppercase">
                    <li className="" style={{ color: linkColor }}>
                      Instagram
                    </li>
                    <li className="" style={{ color: linkColor }}>
                      Linkedin
                    </li>
                    <li className="" style={{ color: linkColor }}>
                      Pinterest
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <footer className="w-full h-26 max-md:h-32">
              <ul className="relative px-6 py-5 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-6 max-md:px-3">
                <li className="relative w-fit flex items-center gap-4">
                  <p className="n-txt uppercase" style={{ color: linkColor }}>
                    BE INSPIRED
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Email"
                      className={`w-[150px] h-5 pl-3 py-1 bg-transparent border border-p rounded-full font-acid-n text-p text-[.6rem] tracking-[.8px]
                 placeholder:${linkColor ? "text-t" : "text-p"} outline-none`}
                      style={{
                        border: "1px solid" + linkColor,
                        color: linkColor,
                      }}
                    />
                    <button className="w-fit px-4 py-1 bg-[#3131310e] backdrop-blur-sm rounded-full font-acid-r text-[.6rem] tracking-[.8px]">
                      Subscribe
                    </button>
                  </div>
                </li>

                <li className="relative w-fit flex items-center gap-14">
                  <p className="n-txt uppercase" style={{ color: linkColor }}>
                    9 rue du Mont Thabor, 75001 Paris
                  </p>
                  <p className="n-txt uppercase" style={{ color: linkColor }}>
                    © 2025 Maison90
                  </p>
                </li>
              </ul>
            </footer>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
