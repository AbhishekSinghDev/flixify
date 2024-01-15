import { MovieSchemaInterface } from "@/lib/database/models/Movie";
import React from "react";
import ModelPop from "./ModelPop";
import { Badge } from "../ui/badge";

interface CardProps {
  movie: MovieSchemaInterface;
  renderingOn?: "premiumContent";
}

const CardCatelogue: React.FC<CardProps> = ({ movie, renderingOn }) => {
  return (
    <div className="group col-span">
      <ModelPop
        movie={movie}
        renderingOn={`${
          renderingOn === "premiumContent"
            ? "premiumContent"
            : "moviesCatalogue"
        }`}
      />
      {renderingOn && renderingOn === "premiumContent" && (
        <div className="flex items-center justify-between w-full gap-2">
          <div>
            <p className="sm:text-base text-sm line-clamp-1">
              <span className="dark:text-green-400 font-medium">Title: </span>
              {movie.title && movie.title}
            </p>
            <p className="sm:text-base text-sm line-clamp-1">
              <span className="dark:text-green-400 text-black font-medium">
                Imdb rating:{" "}
              </span>
              {movie.rating && movie.rating} / 10
            </p>
          </div>
          <div>
            <Badge>{movie.genre && movie.genre}</Badge>
          </div>
        </div>
      )}
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
