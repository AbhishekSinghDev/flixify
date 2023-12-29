import * as React from "react";

import { MovieSchemaInterface } from "@/lib/database/models/Movie";
import ModelPop from "./ModelPop";

interface MovieCardProps {
  movies: Array<MovieSchemaInterface>;
}

const MovieCard: React.FC<MovieCardProps> = ({ movies }) => {
  return (
    <div className="flex">
      {movies &&
        movies.map((movie: MovieSchemaInterface) => (
          <div
            key={movie._id}
            className="group col-span relative h-[12vw] mx-4"
          >
            <ModelPop movie={movie} />
          </div>
        ))}
    </div>
  );
};

export default MovieCard;
