import connectToDatabase from "@/lib/database";
import Movie from "@/lib/database/models/Movie";

export const GET = async (req: Request) => {
  try {
    await connectToDatabase();

    const movies = await Movie.find({ tmdb_id: 0 });

    const response = {
      movies,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
