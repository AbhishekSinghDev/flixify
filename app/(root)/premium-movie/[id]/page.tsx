"use client";

import { MovieSchemaInterface } from "@/lib/database/models/Movie";
import { UserSchemaInterface } from "@/lib/database/models/User";
import axios, { Axios, AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adultIcon from "@/public/images/adult-icon.png";
import Image from "next/image";
import Link from "next/link";

interface PremiumMovieProps {
  params: { id: string };
}

const PremiumMovie: React.FC<PremiumMovieProps> = ({ params: { id } }) => {
  const [userid, setUserid] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserSchemaInterface>();
  const [movie, setMovie] = useState<MovieSchemaInterface>();

  // movie-details useEffect
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const { data } = await axios.get(`/api/movie/premium/${id}`);
        setMovie(data.movie);
      } catch (e) {
        console.log(e);
      }
    };

    if (id) getMovieDetails();
  }, [id]);

  // user-token useEffect
  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.get("/api/auth/get-token");
        setUserid(data.user.userId);
      } catch (err: any) {
        toast.error(`${err.message}`);
        const error = err as AxiosError;
        if (error.response?.status === 401)
          toast.error("Login to unlock premium movies");
      }
    };

    getToken();
  }, []);

  // user-details useEffect
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const { data } = await axios.post("/api/auth/get-user", {
          userId: userid,
        });
        setUser(data.user);
      } catch (e: any) {
        toast.error(`${e.message}`);
      }
    };

    if (userid) {
      getUserDetails();
    }
  }, [userid]);

  return (
    <div className="h-fit my-8">
      <div className="h-auto w-auto flex items-center justify-center rounded-xl">
        {user?.isPremiumUser === true ? (
          <iframe
            src={
              movie?.videoUrl && movie?.thumbnailUrl
                ? movie.videoUrl +
                  "?autoplay=0&loop=1&color=white&controls=1&modestbranding=1&playsinline=1&showinfo=0;&rel=0&enablejsapi=1"
                : movie?.thumbnailUrl
            }
            className="h-[40vw] w-[80vw] rounded-xl bg-black"
            onLoad={() => toast("Loading movie")}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          />
        ) : (
          <div className="flex flex-col items-center justify-center my-6">
            <Image
              src={movie?.thumbnailUrl ? movie.thumbnailUrl : ""}
              alt="movie"
              height={1000}
              width={1000}
              className="rounded-md h-[40vw] w-[70vw]"
            />

            <p className="mt-4">
              <span className="text-red-500 sm:text-2xl font-semibold">
                Buy Premium :
              </span>{" "}
              <Link
                href="/"
                className="border dark:border-gray-500 border-black rounded-md hover:bg-gray-500 px-4 py-2 ml-2 font-semibold"
              >
                Checkout
              </Link>
            </p>
          </div>
        )}
      </div>

      <div className="my-4 flex flex-col items-center justify-around xl:flex-row">
        <div className="my-4 xl:w-1/2 mx-12">
          <p className="md:text-4xl sm:text-2xl text-base font-bold mb-2">
            {movie?.title && movie.title}
          </p>
          <p className=" sm:text-xl text-semibold text-justify mb-2">
            {movie?.description && movie.description}
          </p>
          <p>
            <span className="dark:text-green-500 text-black font-bold sm:text-xl text-justify">
              Released on:
            </span>{" "}
            {movie?.releaseDate && movie.releaseDate}
          </p>
        </div>
        <div className="my-4 flex items-start w-full xl:w-auto px-12 flex-col text-justify">
          <p className="sm:text-xl text-semibold text-justify">
            <span className="dark:text-green-500 text-black font-bold">
              Language:
            </span>{" "}
            {movie?.language && movie.language}
          </p>
          <p className="sm:text-xl text-semibold text-justify">
            <span className="dark:text-green-500 text-black font-bold">
              Rating:{" "}
            </span>
            {movie?.rating && movie.rating}
          </p>
          <p className="sm:text-xl text-semibold text-justify">
            <span className="dark:text-green-500 text-black font-bold">
              Genre:{" "}
            </span>
            {movie?.genre && movie.genre}
          </p>
          <p className="sm:text-xl text-semibold text-justify">
            <span className="dark:text-red-500 text-black font-bold">
              Type:{" "}
            </span>
            {movie?.adult === true ? (
              <Image src={adultIcon} height={20} width={20} alt="18+" />
            ) : (
              "Anyone can watch"
            )}{" "}
          </p>
        </div>
      </div>

      {/* {
    "_id": "658e6c667656e1bbbeb1cc21",
    "tmdb_id": 0,
    "isPremiumContent": false,
    "title": "Sintel",
    "description": "A lonely young woman, Sintel, helps and befriends a dragon, whom she calls Scales. But when he is kidnapped by an adult dragon, Sintel decides to embark on a dangerous quest to find her lost friend Scales.",
    "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "thumbnailUrl": "http://uhdtv.io/wp-content/uploads/2020/10/Sintel-3.jpg",
    "genre": "Adventure",
    "duration": "9 minutes",
    "adult": false,
    "language": "en",
    "releaseDate": "2020-05-11",
    "rating": 9
} */}
    </div>
  );
};

export default PremiumMovie;
