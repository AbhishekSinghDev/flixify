"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// import Billboard from "@/components/shared/Billboard";
import MovieCard from "@/components/shared/MovieCard";
// import MoviesCatalogue from "@/components/shared/MoviesCatalogue";
// import PremiumContent from "@/components/shared/PremiumContent";
import { MovieSchemaInterface } from "@/lib/database/models/Movie";

const Billboard = dynamic(() => import("@/components/shared/Billboard"), {
  loading: () => <p>Loading...</p>,
});
const MoviesCatalogue = dynamic(
  () => import("@/components/shared/MoviesCatalogue"),
  {
    loading: () => <p>Loading...</p>,
  }
);
const PremiumContent = dynamic(
  () => import("@/components/shared/PremiumContent")
);

import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState<MovieSchemaInterface[]>([]);

  useEffect(() => {
    const getAllMovie = async () => {
      const { data } = await axios.get("/api/movie/movie-with-video");
      setMovies(data.movies);
    };

    getAllMovie();
  }, [movies.length]);

  return (
    <section>
      <div className="w-full">
        <Billboard />
      </div>

      {/* Trending Now */}
      <div className="absolute top-[53vw] h-auto w-auto">
        <p className="wrapper font-semibold md:text-2xl text-sm">
          Popular on Flixify
        </p>
        <div className="flex items-center justify-center overflow-x-scroll no-scrollbar max-w-[92%] lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
          <MovieCard movies={movies} />
        </div>
      </div>

      {/* Movies Catelogue */}
      <div className="absolute sm:top-[85vw] md:top-[75vw] top-[95vw] h-auto w-full">
        <p className="wrapper font-semibold md:text-2xl text-sm md:mt-10 lg:mt-0">
          Movies Catalogue
        </p>
        <div className="flex items-start justify-center overflow-scroll no-scrollbar max-w-screen-sm sm:max-w-[90%] md:max-w-[90%] lg:max-w-[92%] xl:max-w-[92%] lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
          <MoviesCatalogue />
        </div>
      </div>

      {/* Premium Content */}
      <div className="absolute sm:top-[85vw] md:top-[133vw] lg:top-[120vw] top-[190vw] h-auto w-full">
        <p className="wrapper font-semibold md:text-2xl text-sm dark:text-yellow-400">
          Premium Movies
        </p>
        <div className="flex items-start justify-center overflow-scroll no-scrollbar max-w-screen-sm sm:max-w-[90%] md:max-w-[90%] lg:max-w-[92%] xl:max-w-[92%] lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
          <PremiumContent />
        </div>
      </div>
    </section>
  );
};

export default Home;
