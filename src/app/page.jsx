"use client";
import { useEffect, useState } from "react";
import ChoiceContent from "@/components/hero/choiceContent";
import InitialOverlay from "@/components/hero/initialOverlay";

const Home = () => {
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClickable(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = () => {
    if (!isClickable) return;
    const element = document.getElementById("a");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ChoiceContent />

      <div className="snap-y snap-mandatory pointer-events-auto">
        <section
          className={`snap-start w-screen h-[100dvh] ${
            isClickable ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={scrollToSection}
        >
          <InitialOverlay />
        </section>

        <section className="snap-start w-screen h-[100dvh]" id="a" />
      </div>
    </>
  );
};

export default Home;
