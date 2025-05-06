import Image from "next/image";
import getIntoTheMoodData from "@/data/getIntoTheMoodData";

const SmallNav = ({ x2images }) => {
  return (
    <div className="sticky top-0 px-6 pt-22 pb-4 bg-[#0A0A0A] flex justify-between max-md:flex-col max-md:items-start max-md:justify-start max-md:px-3">
      <div className="flex-[2]">
        <h1 className="font-acid-b text-[1rem] text-p uppercase">
          Get into the mood
        </h1>
      </div>
      <div className="flex-[2]">
        <p className="font-acid-r text-[.75rem] text-p text-end opacity-75">
          {x2images.length} inspirations, unseen, archived, or ongoing projects
        </p>
      </div>
    </div>
  );
};
const MasonryCards = ({ masonry }) => {
  return (
    <figure className="w-auto h-auto">
      <Image
        src={masonry}
        width={300}
        height={300}
        alt={`Masonry image`}
        loading="lazy"
        className="size-full mt-4 object-cover"
      />
    </figure>
  );
};

const GetIntoTheMood = () => {
  const x2images = [...getIntoTheMoodData, ...getIntoTheMoodData];
  return (
    <section className="min-h-[100vh]">
      <SmallNav x2images={x2images} />
      <div className="mb-24 px-6 flex flex-col max-md:px-3">
        <div className="columns-8 gap-4 max-lg:columns-6 max-md:columns-3">
          {x2images.map((masonry, i) => (
            <MasonryCards key={i} masonry={masonry} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetIntoTheMood;
