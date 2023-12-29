import { MovieSchemaInterface } from "@/lib/database/models/Movie";
import Image from "next/image";
import React from "react";
import ModelPop from "./ModelPop";

interface CardProps {
  movie: MovieSchemaInterface;
}

const CardCatelogue: React.FC<CardProps> = ({ movie }) => {
  return (
    <div className="group col-span">
      <ModelPop movie={movie} renderingOn="moviesCatalogue" />
    </div>
  );
};

export default CardCatelogue;

{
  /* <div>
  <div className="group col-span relative bg-zinc-900 mx-1">
    <Image
      src={movie?.thumbnailUrl}
      alt={movie.title}
      height={200}
      width={200}
      className="cursor-pointer object-cover transition duration-150 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-50 w-full"
    />
  </div>
</div>; */
}
