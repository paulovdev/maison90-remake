"use client";
import creativeAgencyHeroProjectsData from "@/data/creativeAgencyHeroProjectsData";
import { motion } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";

const ProjectsFullscreen = ({ project }) => {
  const router = useTransitionRouter();
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
  return (
    <section
      className="snap-center w-screen h-screen flex items-center justify-center"
      onClick={() =>
        router.push("creative-agency/project/" + project.id, {
          onTransitionReady: slideInOut,
        })
      }
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <figure className="size-full select-none">
          <Image
            src={project.src}
            width={2000}
            height={1800}
            alt=""
            className="size-full object-cover brightness-95 select-none"
          />
        </figure>
        <motion.h1
          className="absolute ll-txt text-s uppercase"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.75,
              duration: 0.75,
              ease: [0.54, 0, 0.14, 1],
            },
          }}
        >
          {project.title}
        </motion.h1>
      </div>
    </section>
  );
};

const CreativeAgency = () => {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {creativeAgencyHeroProjectsData.map((project, i) => (
        <ProjectsFullscreen key={i} project={project} />
      ))}
    </main>
  );
};

export default CreativeAgency;
