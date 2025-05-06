"use client";
import { motion } from "framer-motion";
import getDressedAndGoOutData from "@/data/getDressedAndGoOutData";
import Image from "next/image";
import React, { useState } from "react";

const SmallNav = () => {
  return (
    <div className="sticky top-0 px-6 pt-22 pb-4 bg-[#0A0A0A] flex justify-between max-md:flex-col max-md:items-start max-md:justify-start max-md:px-3">
      <div className="flex-[2]">
        <h1 className="font-acid-b text-[1rem] text-p uppercase">
          Get dressed & go out
        </h1>
      </div>
      <div className="flex-[2]">
        <p className="font-acid-r text-[.75rem] text-p text-end opacity-75">
          {getDressedAndGoOutData.length} of the coolest places that redefine
          the art of travel
        </p>
      </div>
    </div>
  );
};

const Card = ({ news, cardOpen, cardClicked }) => {
  const descriptionAnimation = {
    closed: {
      height: "0px",
      opacity: 0,
    },
    open: {
      height: "auto",
      opacity: 1,
    },
  };

  return (
    <div className="relative h-full">
      <figure className="select-none">
        <Image
          src={news.src}
          width={2000}
          height={2000}
          alt={news.title}
          className={`w-full object-cover brightness-95 select-none cursor-pointer`}
          onClick={cardClicked}
        />
      </figure>
      <div className="mt-4" onClick={cardClicked}>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="font-acid-b text-p text-[.7rem] tracking-[-.2px] uppercase">
              {news.title}
            </h2>
            <span className="font-acid-r text-p text-[1rem]">
              {cardOpen ? "-" : "+"}
            </span>
          </div>
          <p className="font-acid-n text-p text-[.6rem] uppercase">
            {news.city}
          </p>
          <p className="font-acid-n text-p text-[.6rem] uppercase">
            {news.category}
          </p>
        </div>

        <motion.div
          className="flex flex-col items-start overflow-hidden "
          variants={descriptionAnimation}
          initial="closed"
          animate={cardOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-8 grid grid-cols-3 gap-2">
            {news.extraSrc.map((img, i) => (
              <figure className="size-full select-none" key={i}>
                <Image
                  src={img}
                  width={300}
                  height={300}
                  alt={`${news.title} extra ${i + 1}`}
                  className={`size-full object-cover brightness-95`}
                />
              </figure>
            ))}
          </div>
          <p className="font-acid-n text-[.75rem] text-p opacity-75">
            {news.description}
          </p>
          <p className="my-4 font-acid-n text-[.75rem] text-p opacity-75">
            {news.author}
          </p>
          <div className="flex items-center gap-4">
            <p className="font-acid-n text-[.65rem] text-p opacity-75 uppercase">
              WEBSITE
            </p>
            <p className="font-acid-n text-[.65rem] text-p opacity-75 uppercase">
              INSTAGRAM
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const NavList = ({ selectedType, setSelectedType }) => {
  const countries = [
    "ARGENTINA",
    "AUSTRALIA",
    "AUSTRIA",
    "BELGIUM",
    "BRAZIL",
    "RIO DE JANEIRO",
    "CANADA",
    "CAYMAN ISLANDS",
    "CHINA",
    "DENMARK",
    "DOMINICAN REPUBLIC",
    "FINLAND",
    "FRANCE",
    "GERMANY",
    "GREECE",
    "INDONESIA",
    "ITALY",
    "IVORY COAST",
    "JAPAN",
    "KENYA",
    "KOREA",
    "MEXICO",
    "MOROCCO",
    "MOZAMBIQUE",
    "NETHERLANDS",
    "PORTUGAL",
    "QATAR",
    "RUSSIA",
    "SAUDI ARABIA",
    "SENEGAL",
    "SPAIN",
    "SRI LANKA",
    "SWEDEN",
    "THAILAND",
    "TUNISIA",
    "UKRAINE",
    "UNITED ARAB EMIRATES",
    "UNITED KINGDOM",
    "UNITED STATES",
  ];

  const types = [
    "ALL",
    "BAKERY",
    "BAR",
    "BOOKSHOP",
    "COFFEE SHOP",
    "GALLERY",
    "GYM",
    "HOTEL",
    "MUSEUM",
    "RESTAURANT",
    "STORE",
    "WELL BEING",
  ];

  return (
    <aside className="h-full">
      <div>
        <h2 className="mb-4 n-txt text-p uppercase">COUNTRIES</h2>
        <ul>
          {countries.map((country) => {
            const isHighlighted =
              country === "BRAZIL" || country === "RIO DE JANEIRO";
            return (
              <li
                key={country}
                className={`n-txt text-p ${
                  isHighlighted ? "opacity-100" : "opacity-75"
                } ${country === "RIO DE JANEIRO" ? "ml-4" : ""}`}
              >
                {country}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h2 className="mt-8 mb-4 n-txt text-p uppercase">TYPES</h2>
        <ul>
          {types.map((type) => (
            <li
              key={type}
              onClick={() => setSelectedType(type)}
              className={`n-txt text-p uppercase hover:opacity-50 cursor-pointer ${
                selectedType === type ? "opacity-100" : "opacity-75"
              }`}
            >
              {type}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

const GetDressedAndGoOut = () => {
  const [cardClicked, setCardClicked] = useState(null);
  const [selectedType, setSelectedType] = useState("ALL");

  const filteredData = getDressedAndGoOutData.filter(
    (detail) =>
      selectedType === detail.type.toUpperCase() || selectedType === "ALL"
  );

  return (
    <section className="min-h-[100vh]">
      <SmallNav getDressedAndGoOutData={getDressedAndGoOutData} />
      <div className="mb-24 px-6 flex flex-col max-md:px-3">
        <div className="w-full grid grid-cols-6 gap-4">
          <div className="h-[80vh] grid grid-cols-3 gap-4 col-span-5 max-md:grid-cols-1 max-md:col-span-4 overflow-y-scroll">
            {filteredData.length === 0 ? (
              <div className="size-full flex justify-center items-center col-span-6">
                <p className="n-txt text-p">Nothing to show at the moment.</p>
              </div>
            ) : (
              filteredData.map((news, i) => (
                <Card
                  key={i}
                  news={news}
                  cardOpen={cardClicked === i}
                  cardClicked={() =>
                    setCardClicked((prevIndex) => (prevIndex === i ? null : i))
                  }
                />
              ))
            )}
          </div>

          <div className="h-[80vh] flex-[0.6] col-span-1 max-md:col-span-2 overflow-y-scroll ">
            <NavList
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetDressedAndGoOut;
