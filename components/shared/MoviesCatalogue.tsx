"use client";

import { MovieSchemaInterface } from "@/lib/database/models/Movie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardCatelogue from "./Card";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MoviesCatalogue: React.FC = () => {
  const [allMovies, setAllMovies] = useState<MovieSchemaInterface[]>();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const { data } = await axios.get("/api/movie");

        setAllMovies(data.movies);
      } catch (err) {
        console.log(err);
      }
    };

    getAllMovies();
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-full h-full"
    >
      <CarouselContent>
        {allMovies &&
          allMovies.map((movie: MovieSchemaInterface) => (
            <CarouselItem
              key={movie._id}
              className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 basis-1/1"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-start p-6">
                    <CardCatelogue key={movie._id} movie={movie} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MoviesCatalogue;
