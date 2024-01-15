import connectToDatabase from "@/lib/database";
import Movie, { MovieSchemaInterface } from "@/lib/database/models/Movie";

export const GET = async (req: Request, { params }: any) => {
  const id = params?.id;

  if (!id) {
    return new Response(
      JSON.stringify({ message: "Please provide the id of the movie" }),
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const movie = await Movie.findById(id);

    if (!movie) {
      return new Response(JSON.stringify({ message: "Movie not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ movie: movie }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
