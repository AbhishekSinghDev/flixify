"use client";

import Billboard from "@/components/shared/Billboard";
import MovieCard from "@/components/shared/MovieCard";
import MoviesCatalogue from "@/components/shared/MoviesCatalogue";
import { MovieSchemaInterface } from "@/lib/database/models/Movie";
import axios from "axios";
import { useEffect, useState } from "react";

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
        <p className="wrapper font-semibold text-2xl">Popular on Flixify</p>
        <div className="flex items-center justify-center overflow-x-scroll no-scrollbar max-w-[92%] lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
          <MovieCard movies={movies} />
        </div>
      </div>

      <div className="absolute sm:top-[85vw] md:top-[75vw] top-[95vw] h-auto w-full">
        <p className="wrapper font-semibold text-2xl">Movies Catalogue</p>
        <div className="flex items-start justify-center overflow-scroll no-scrollbar max-w-[92%] lg:mx-auto p-5 md:px-10 xl:px-0 w-full">
          <MoviesCatalogue />
        </div>
      </div>
    </section>
  );
};

export default Home;
