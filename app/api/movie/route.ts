import connectToDatabase from "@/lib/database";
import Movie from "@/lib/database/models/Movie";

export const GET = async () => {
  try {
    await connectToDatabase();

    const moviesList = await Movie.find({}).limit(10);

    return new Response(JSON.stringify({ movies: moviesList }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Some server error" }), {
      status: 500,
    });
  }
};
