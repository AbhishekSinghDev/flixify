import connectToDatabase from "@/lib/database";
import Movie, { MovieSchemaInterface } from "@/lib/database/models/Movie";

export const GET = async () => {
  try {
    await connectToDatabase();

    const premiumMovies: Array<MovieSchemaInterface> = await Movie.find({
      isPremiumContent: true,
    });

    if (premiumMovies.length === 0) {
      return new Response(
        JSON.stringify({ message: "No Premium Movie Available Right Now" }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify({ movies: premiumMovies }), {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Some server error" }), {
      status: 500,
    });
  }
};
