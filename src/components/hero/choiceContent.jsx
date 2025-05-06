"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import choiceContentData from "@/data/choiceContentData";

const blurAnimation = {
  blurred: {
    filter: "blur(16px)",
    scale: 1.05,
    transition: {
      duration: 0.6,
      ease: [0.74, 0, 0.14, 1],
    },
  },
  clear: {
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.74, 0, 0.14, 1],
    },
  },
};

const imageAnimation = {
  initial: {
    width: "100%",
  },
  opened: {
    width: "0%",
    scale: 1.25,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const titleAnimation = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
    transition: {
      duration: 0.1,
      ease: [0.32, 0, 0.53, 0.99],
    },
  },
  animate2: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.32, 0, 0.53, 0.99],
    },
  },
  animate: {
    opacity: 0,
    filter: "blur(10px)",
    transition: {
      duration: 1,
      ease: [0.32, 0, 0.53, 0.99],
    },
  },
};

const ChoiceContent = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [titleIndex, setTitleIndex] = useState(null);
  const [newTitle, setNewTitle] = useState(null);
  const router = useTransitionRouter();

  const handleCardClick = (index) => {
    setTitleIndex(true);
    setClickedIndex(index);
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

  return (
    <>
      <section className="fixed top-0 w-screen h-screen z-40">
        <div className="flex">
          {choiceContentData.map((card, i) => {
            const isBlurred = hoveredIndex !== null && hoveredIndex !== i;
            const variant = isBlurred ? "blurred" : "clear";

            const otherCardVariant = clickedIndex === 0 && i === 1 && "opened";
            const otherCardVariant2 = clickedIndex === 1 && i === 0 && "opened";

            return (
              <motion.div
                key={i}
                className={`relative size-full flex items-center justify-center overflow-hidden`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(i)}
                variants={imageAnimation}
                initial="initial"
                animate={i === 0 ? otherCardVariant2 : otherCardVariant}
                onAnimationComplete={() => {
                  setNewTitle(true);

                  setTimeout(() => {
                    router.push(card.href, {
                      onTransitionReady: slideInOut,
                    });
                  }, 1500);
                }}
              >
                <motion.div
                  className="absolute h-full flex flex-col items-center justify-between z-10"
                  variants={blurAnimation}
                  animate={variant}
                >
                  <div className="relative h-fit"></div>
                  {!newTitle && (
                    <motion.h1
                      className="nl-txt text-s uppercase"
                      variants={titleAnimation}
                      animate={titleIndex && "animate"}
                    >
                      {card.title}
                    </motion.h1>
                  )}
                  {newTitle && (
                    <motion.h1
                      className="nll-txt text-s"
                      variants={titleAnimation}
                      initial="initial"
                      animate="animate2"
                    >
                      {card.title2}
                    </motion.h1>
                  )}
                  <motion.p
                    className="mb-6 n-txt text-s  uppercase"
                    variants={titleAnimation}
                    animate={titleIndex && "animate"}
                  >
                    {card.subtitle}
                  </motion.p>
                </motion.div>
                <figure className="size-full select-none">
                  <motion.img
                    src={card.image}
                    alt=""
                    width={1900}
                    height={1000}
                    className="h-screen w-screen object-cover"
                    variants={blurAnimation}
                    animate={variant}
                  />
                </figure>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ChoiceContent;
