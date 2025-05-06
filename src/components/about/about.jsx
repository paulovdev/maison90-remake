"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const About = ({ setShowAboutModal, showAboutModal }) => {
  const pathname = usePathname();
  const modalAnimation = {
    open: {
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.74, 0, 0.14, 1],
      },
    },
    close: {
      x: "100vw",
      transition: {
        duration: 0.6,
        ease: [0.74, 0, 0.14, 1],
      },
    },
  };

  const services = [
    "Brand Strategy & Positioning",
    "Naming & Branding",
    "Logo & Visual Identity",
    "Creative Campaign, Creative Concept & Art Direction",
    "Photo & Video Shoot",
    "Print, Editorial & Digital Design",
    "Packaging, Signage & Collateral",
  ];

  const contacts = ["INSTAGRAM", "LINKEDIN", "PINTEREST"];

  const isProjectPage = pathname.startsWith("/creative-agency/project");
  const backgroundColor = isProjectPage ? "#DADAD2" : "#0A0A0A";
  const linkColor = pathname.startsWith("/creative-agency/project")
    ? "#000"
    : "#fff";

  return (
    <AnimatePresence>
      {showAboutModal && (
        <motion.div
          className="fixed inset-0 h-screen z-50"
          style={{ background: backgroundColor }}
          variants={modalAnimation}
          initial="close"
          animate={showAboutModal ? "open" : "close"}
          exit="close"
          key={showAboutModal}
        >
          <div
            className="absolute top-2 right-4 cursor-pointer"
            onClick={() => setShowAboutModal(!showAboutModal)}
          >
            <span
              className="n-txt text-p uppercase opacity-75"
              style={{ color: linkColor }}
            >
              CLOSE
            </span>
          </div>

          <div className="h-full mx-24 mt-24 flex flex-col justify-between max-lg:mx-8 max-md:mx-3 max-md:mt-22">
            <div className="h-full max-md:h-fit">
              <p className="nnl-txt opacity-75" style={{ color: linkColor }}>
                From Strategy to Art Direction, we love to push the boundaries
                of creativity by blending cultural audacity with timeless
                elegance. Based in Paris, Maison90 is a Creative Agency who
                believes in limitless creation. Intervening at all stages of the
                creative process, our team is dedicated to create unique
                identities for our outstanding clients.
              </p>
            </div>
            <div className="w-full h-full mt-22 flex justify-between max-md:flex-col max-md:gap-8">
              <ul className="h-full flex-[2] flex flex-col max-md:h-fit max-md:flex-none">
                <li
                  className="mb-2 nnll-txt uppercase"
                  style={{ color: linkColor }}
                >
                  Services
                </li>
                {services.map((service, i) => (
                  <li
                    className="le-txt  opacity-75"
                    key={i}
                    style={{ color: linkColor }}
                  >
                    {service}
                  </li>
                ))}
              </ul>

              <ul className="h-full flex-[1] flex flex-col max-md:h-fit max-md:flex-auto">
                <li
                  className="mb-2 nnll-txt  uppercase"
                  style={{ color: linkColor }}
                >
                  CONTACT
                </li>

                <li className="le-txt  opacity-75" style={{ color: linkColor }}>
                  office@maison90.com
                </li>
                <li className="le-txt  opacity-75" style={{ color: linkColor }}>
                  jobs@maison90.com
                </li>
                <li
                  className="mt-8 le-txt  opacity-75"
                  style={{ color: linkColor }}
                >
                  9 rue du Mont Thabor, 8501 Paris
                </li>
                <li className="le-txt opacity-75" style={{ color: linkColor }}>
                  Private Policy
                </li>
                <div className="mt-10 flex gap-10">
                  {contacts.map((contact, i) => (
                    <li
                      className="n-txt uppercase opacity-85"
                      key={i}
                      style={{ color: linkColor }}
                    >
                      {contact}
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default About;
