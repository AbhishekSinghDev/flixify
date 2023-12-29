"use client";

import React, { useEffect, useState } from "react";
import { MovieSchemaInterface } from "@/lib/database/models/Movie";
import Image from "next/image";
import { CiCircleInfo } from "react-icons/ci";
import axios from "axios";

const Billboard: React.FC = () => {
  const [movie, setMovie] = useState<MovieSchemaInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getRandomMovie = async () => {
      try {
        const { data } = await axios.get("/api/movie/random");

        setMovie(data.movie);
      } catch (err) {
        console.log(err);
      }
    };

    getRandomMovie();
  }, []);

  return (
    <div className="overflow-hidden">
      <video
        className="w-full h-[51vw] object-cover brightness-[60%] dark:brightness-[40%] absolute top-0"
        autoPlay
        muted
        loop
        poster={movie?.thumbnailUrl}
        src={movie?.videoUrl}
        onLoad={() => setIsLoading(!isLoading)}
      ></video>

      {isLoading ? (
        <Image
          src={
            movie?.thumbnailUrl
              ? movie?.thumbnailUrl
              : "https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media/banner.jpg"
          }
          height={500}
          width={500}
          alt="poster"
        />
      ) : (
        <></>
      )}

      {movie && (
        <div className="absolute top-[20vw] w-[40%] lg:ml-20 ml-8 flex items-start justify-center flex-col gap-3">
          <h1 className="text-white lg:text-7xl md:text-4xl text-2xl font-bold ml-2 font-montserrat drop-shadow-xl">
            {movie?.title && movie.title}
          </h1>
          <p className="text-white text-opacity-80 xl:text-xl md:block hidden text-sm font-medium m-2 w-[90%] line-clamp-3 text-justify">
            {movie?.description && movie.description}
          </p>
          <button className="border-none bg-white rounded-md px-4 py-2 ml-2 bg-opacity-40 text-white flex items-center justify-center gap-2 cursor-pointer text-sm">
            <CiCircleInfo />
            More Info
          </button>
        </div>
      )}
    </div>
  );
};

export default Billboard;
