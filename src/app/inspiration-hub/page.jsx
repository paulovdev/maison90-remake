"use client";
import newsData from "@/data/newsData";
import verticalCarouselData from "@/data/verticalCarouselData";
import { motion, AnimatePresence } from "framer-motion";
import { useTransitionRouter } from "next-view-transitions";
import Image from "next/image";
import { useEffect, useState } from "react";

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

const VerticalCarousel = () => {
  const [index, setIndex] = useState(0);


  const router = useTransitionRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % verticalCarouselData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      <motion.div
        animate={{ y: `-${index * 100}dvh` }}
        transition={{ duration: 1, ease: [0.39, -0.01, 0.43, 1.01] }}
        className="absolute w-screen h-screen top-0"
      >
        {verticalCarouselData.map((project, i) => (
          <div
            className="relative"
            key={i}
            onClick={() =>
              router.push("/inspiration-hub" + project.href, {
                onTransitionReady: slideInOut,
              })
            }
          >
            <figure className="size-full select-none">
              <Image
                src={project.src}
                width={2000}
                height={2000}
                alt={project.title}
                className="w-screen h-screen object-cover brightness-95 select-none cursor-pointer"
              />
            </figure>
          </div>
        ))}
      </motion.div>

      <div className="absolute flex gap-16">
        <div className="absolute h-[50px] -left-30 flex items-center justify-start max-ds:-left-10 max-lg:left-10 max-md:left-25">
          <h1 className="ll-txt text-p uppercase">GET</h1>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="w-[500px] h-[50px] flex items-center justify-center overflow-hidden"
            key={verticalCarouselData[index].id}
          >
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className=" ll-txt text-p uppercase overflow-hidden "
            >
              {verticalCarouselData[index].title}
            </motion.h1>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const NewsCard = ({ news }) => {
  const router = useTransitionRouter();
  return (
    <>
      <div
        className="relative mb-16 cursor-pointer"
        onClick={() => {
          const notEmptyHref = news.href.length > 0 ? news.href : "";
          router.push("/inspiration-hub" + notEmptyHref, {
            onTransitionReady: slideInOut,
          });
        }}
      >
        <figure className="select-none">
          <Image
            src={news.src}
            width={2000}
            height={2000}
            alt={news.title}
            className={`w-full object-cover brightness-95 ${news.height} max-md:h-full`}
          />
        </figure>

        <div className="mt-4">
          <h2 className="ut-txt text-p uppercase">{news.title}</h2>
          <p className="ul-txt text-p opacity-75 uppercase">
            {news.description}
          </p>
        </div>
      </div>
    </>
  );
};

const InspirationHub = () => {
  return (
    <div className="bg-[#0A0A0A]">
      <VerticalCarousel />
      <section className="h-screen my-26 px-6 max-md:px-3">
        <h2 className="my-12 font-acid-n text-p text-[.9rem] tracking-[.7px] uppercase">
          LATEST NEWS
        </h2>
        <div className="w-full grid grid-cols-3 gap-4 max-md:grid-cols-1">
          {newsData.map((news, i) => (
            <NewsCard key={i} news={news} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default InspirationHub;
