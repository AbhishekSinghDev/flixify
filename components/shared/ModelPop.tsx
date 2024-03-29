import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MovieSchemaInterface } from "@/lib/database/models/Movie";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ModelPopProps {
  movie: MovieSchemaInterface;
  renderingOn?:
    | "moviesCatalogue"
    | "popularOnFlixify"
    | "billboard"
    | "premiumContent";
}

const ModelPop: React.FC<ModelPopProps> = ({ movie, renderingOn }) => {
  const router = useRouter();
  const onMovieClick = () => {
    router.push(`/premium-movie/${movie._id}`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {renderingOn === "billboard" ? (
          <p>More Info</p>
        ) : (
          <img
            src={movie?.thumbnailUrl}
            alt="movie"
            className={`cursor-pointer object-cover transition duration-150 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-80 w-full rounded-xl ${
              renderingOn && renderingOn === "moviesCatalogue"
                ? "h-[50vw] md:h-full"
                : "h-[12vw]"
            }`}
          />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <img
            src={movie?.thumbnailUrl}
            alt="movie"
            className={`cursor-pointer object-cover transition duration-150 rounded-md ${
              renderingOn && renderingOn === "moviesCatalogue"
                ? "aspect-square"
                : "aspect-video"
            }`}
          />
          <AlertDialogTitle>{movie?.title}</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="text-justify">{movie?.description}</p>
          </AlertDialogDescription>
          <AlertDialogDescription>
            <div className="flex items-start justify-start flex-col gap-2">
              <p>
                <span className="text-black dark:text-green-400 font-semibold">
                  Release Date:{" "}
                </span>{" "}
                {movie?.releaseDate}
              </p>
              <p>
                <span className="text-black dark:text-green-400 font-semibold">
                  Duration:{" "}
                </span>{" "}
                {movie?.duration}
              </p>
              <p>
                <span className="text-black dark:text-green-400 font-semibold">
                  Genre:{" "}
                </span>
                {movie?.genre}
              </p>
              <p>
                <span className="text-black dark:text-green-400 font-semibold">
                  Rating:{" "}
                </span>
                {movie?.rating} / 10
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onMovieClick}>
            <FaPlay />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModelPop;
