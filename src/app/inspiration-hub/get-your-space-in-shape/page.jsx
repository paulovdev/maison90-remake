"use client";
import React, { useState } from "react";
import Image from "next/image";
import getUrSpaceData from "@/data/getYourSpaceInShape";

const SmallNav = () => {
  return (
    <div className="sticky top-0 pt-22 pb-4 bg-[#0A0A0A] grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-lg:gap-0">
      <div className="col-span-3 max-lg:col-span-2">
        <h1 className="font-acid-b text-[1rem] text-p uppercase">
          Get your space in shape
        </h1>
      </div>
      <div className="col-span-1 max-lg:col-span-1 max-md:col-span-2">
        <p className="font-acid-r text-[.75rem] text-p opacity-75">
          {getUrSpaceData.length} trend-setting design objects & minimalist
          marvels
        </p>
      </div>
    </div>
  );
};

const ProductDetail = ({ product }) => {
  if (!product) {
    return (
      <div className="flex items-center justify-center border border-p">
        <p className="font-acid-n text-p uppercase text-center">
          Select a product to view details.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] flex flex-col border border-p max-ds:h-[79.2vh] max-lg:h-[140px] max-lg:grid max-lg:grid-cols-3">
      <div className="size-full overflow-hidden max-lg:order-2">
        <figure className="size-full select-none">
          <Image
            src={product.src}
            alt={product.name}
            width={1000}
            height={1000}
            className="size-full object-cover"
          />
        </figure>
      </div>
      <div className="w-full col-span-2">
        <div className="w-full px-4 py-4 flex justify-between gap-4 border-b border-p max-lg:py-2 max-md:px-3">
          <span className="n-txt text-p uppercase text-nowrap">
            PRODUCT NAME:
          </span>
          <p className="n-txt text-p uppercase text-end truncate">
            {product.name}
          </p>
        </div>
        <div className="w-full px-4 py-4 flex justify-between gap-4 border-b border-p max-lg:py-2 max-md:px-3">
          <span className="n-txt text-p uppercase text-nowrap">DESIGNER:</span>
          <p className="n-txt text-p uppercase text-end truncate">
            {product.designer}
          </p>
        </div>
        <div className="w-full px-4 py-4 flex justify-between gap-4 border-b border-p max-lg:py-2 max-md:px-3">
          <span className="n-txt text-p uppercase text-nowrap">DATE:</span>
          <p className="n-txt text-p uppercase text-end truncate">
            {product.date}
          </p>
        </div>
        <div className="w-full px-4 py-4 flex justify-between gap-4 max-lg:py-2 max-md:px-3">
          <span className="n-txt text-p uppercase text-end text-nowrap">
            WHERE TO BUY:
          </span>
          <a
            href={`https://${product.buy}`}
            target="_blank"
            rel="noopener noreferrer"
            className="n-txt text-p uppercase truncate"
          >
            {product.buy}
          </a>
        </div>
      </div>
    </div>
  );
};

const Gallery = ({ detail, cardClicked }) => {
  return (
    <div className="w-full h-auto cursor-pointer" onClick={cardClicked}>
      <figure className="size-full select-none">
        <Image
          src={detail.src}
          width={300}
          height={300}
          alt={detail.name}
          loading="lazy"
          className="w-full object-cover"
        />
      </figure>
    </div>
  );
};

const NavList = ({ selectedType, setSelectedType }) => {
  const views = ["LIFESTYLE", "PACKSHOT"];
  const types = [
    "ALL",
    "ACCESSORIES",
    "BEAUTY",
    "BED",
    "BOOK",
    "CARPET",
    "CHAIR",
    "FASHION",
    "FURNITURE",
    "LAMP",
    "MIRROR",
    "SOFA",
    "TABLE",
    "TABLEWARE",
    "VASE",
  ];

  return (
    <aside className="h-full">
      <div>
        <h2 className="mb-4 n-txt text-p uppercase">VIEW</h2>
        <ul className="n-txt text-p uppercase">
          {views.map((view) => (
            <li key={view} className="hover:opacity-50 cursor-pointer">
              {view}
            </li>
          ))}
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

const GetYourSpaceInShape = () => {
  const [cardClicked, setCardClicked] = useState(getUrSpaceData[0]);
  const [selectedType, setSelectedType] = useState("ALL");

  return (
    <section className="min-h-[100vh] mb-24 px-6 flex flex-col max-md:px-3">
      <SmallNav getUrSpaceData={getUrSpaceData} />
      <div className="w-full grid grid-cols-12 gap-4 max-lg:grid-cols-3">
        <div className="w-full col-span-3 max-lg:col-span-3">
          <ProductDetail product={cardClicked} />
        </div>

        <div className="w-full h-[80vh] col-span-7 max-lg:col-span-2 max-lg:h-[65vh] max-md:h-[62vh] overflow-y-scroll">
          <div className="grid grid-cols-5 gap-4 overflow-y-scroll max-lg:grid-cols-2 max-md:grid-cols-1">
            {getUrSpaceData
              .filter((detail) =>
                selectedType === "ALL"
                  ? true
                  : detail.type.toUpperCase() === selectedType
              )
              .map((detail, i) => (
                <Gallery
                  key={i}
                  detail={detail}
                  cardClicked={() => setCardClicked(detail)}
                />
              ))}
          </div>
        </div>

        <div className="w-full h-[80vh] col-span-2 max-lg:col-span-1 max-lg:h-[65vh] max-md:h-[62vh] overflow-y-scroll">
          <NavList
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>
      </div>
    </section>
  );
};

export default GetYourSpaceInShape;
