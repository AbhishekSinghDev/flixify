import connectToDatabase from "@/lib/database";
import Movie from "@/lib/database/models/Movie";

export const GET = async (req: Request) => {
  try {
    await connectToDatabase();

    const movies = await Movie.find({ tmdb_id: 0 });

    const randomIndex: number = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];

    return new Response(JSON.stringify({ movie: randomMovie }), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Some server error" }), {
      status: 500,
    });
  }
};
