"use client";
import getIntoTheGrooveData from "@/data/getIntoTheGrooveData";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SmallNav = () => {
  return (
    <div className="sticky top-0 px-6 pt-22 pb-4 bg-[#0A0A0A] flex justify-between max-md:flex-col max-md:items-start max-md:justify-start max-md:px-3">
      <div className="flex-[2]">
        <h1 className="font-acid-b text-[1rem] text-p uppercase">
          Get into the groove
        </h1>
      </div>
      <div className="flex-[2]">
        <p className="font-acid-r text-[.75rem] text-p text-end opacity-75">
          {getIntoTheGrooveData.length} volumes of handpicked soundscapes
        </p>
      </div>
    </div>
  );
};

const AudioCard = React.forwardRef(({ audio, cardOpen, cardClicked }, ref) => {
  const slideUpAnimation = {
    initial: {
      y: 0,
    },
    opened: {
      y: -50,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    reset: {
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
  return (
    <motion.div
      className="relative mt-16 snap-start cursor-pointer"
      ref={ref}
      onClick={cardClicked}
      variants={slideUpAnimation}
      initial="initial"
      animate={cardOpen ? "opened" : "reset"}
    >
      <div className="mb-2 flex flex-col items-start">
        <h2 className="font-acid-n text-p text-[.7rem] tracking-[-.2px] uppercase">
          {audio.title}
        </h2>
        <p className="font-acid-r text-p text-[.6rem] opacity-75 uppercase">
          {audio.tracks}
        </p>
      </div>

      <figure className="w-[300px] h-[300px] select-none">
        <Image
          src={audio.src}
          width={300}
          height={300}
          alt={audio.title}
          className="size-full object-cover brightness-95 select-none pointer-events-none"
        />
      </figure>
    </motion.div>
  );
});

const GetIntoTheGroove = () => {
  const [cardClicked, setCardClicked] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (cardClicked !== null && cardRefs.current[cardClicked]) {
      cardRefs.current[cardClicked].scrollIntoView({
        inline: "center",
        behavior: "smooth",
      });
    }
  }, [cardClicked]);

  return (
    <section className="min-h-[100vh]">
      <SmallNav />
      <div className="overflow-hidden my-24 px-6 flex flex-col max-md:px-3 ">
        <div className="h-[50vh] flex items-center justify-center">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 ">
            {getIntoTheGrooveData.map((audio, i) => (
              <AudioCard
                key={i}
                audio={audio}
                cardOpen={cardClicked === i}
                cardClicked={() =>
                  setCardClicked((prevIndex) => (prevIndex === i ? null : i))
                }
                ref={(el) => (cardRefs.current[i] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetIntoTheGroove;
