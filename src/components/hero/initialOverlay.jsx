"use client";

import { motion } from "framer-motion";

const InitialOverlay = () => {
  return (
    <motion.section
      className="relative w-full h-full bg-background flex items-center justify-center z-50 cursor-pointer"
      initial={{
        filter: "blur(10px)",
        scale: 1.05,
      }}
      animate={{
        filter: "blur(0)",
        scale: 1,
        transition: {
          duration: 2,
          ease: [0.54, 0, 0.14, 1],
        },
      }}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="relative h-full"></div>

        <div className="relative h-full">
          <motion.h1
            className="logo-txt text-p uppercase"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 2,
                ease: [0.54, 0, 0.14, 1],
              },
            }}
          >
            MAISON90
          </motion.h1>
        </div>

        <div className="relative h-fit my-6">
          <motion.p
            className="n-txt text-p uppercase"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 2,
                ease: [0.54, 0, 0.14, 1],
              },
            }}
          >
            It's just a vibe.
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
};

export default InitialOverlay;
