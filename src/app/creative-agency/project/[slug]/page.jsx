"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import creativeAgencyHeroProjectsData from "@/data/creativeAgencyHeroProjectsData";

const ProjectsDetail = () => {
  const { slug } = useParams();
  const project = creativeAgencyHeroProjectsData.find(
    (item) => item.id === parseInt(slug)
  );

  if (!project) {
    return <div>Nothing to show at the moment.</div>;
  }

  return (
    <div className="my-24 px-6 flex flex-col max-md:px-3">
      <div className="flex justify-between mb-8 max-md:flex-col">
        <div className="flex-[2]">
          <h1 className="font-acid-b text-[1rem] text-t">{project.title}</h1>
        </div>
        <div className="flex-[2]">
          <p className="font-acid-r text-[.75rem] text-t text-end opacity-75 max-md:text-start">
            {project.description}
          </p>
        </div>
      </div>

      <div className="h-[600px] overflow-hidden max-md:h-full">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 max-md:grid max-md:grid-cols-1">
          {project.img.map((img, i) => (
            <figure
              key={i}
              className="flex-shrink-0 snap-start w-[400px] max-md:w-full"
            >
              <Image
                src={img}
                width={1200}
                height={1200}
                alt={`${project.title} image ${i + 1}`}
                className="h-auto object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsDetail;
