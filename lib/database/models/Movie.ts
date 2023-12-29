import mongoose, { Document, models } from "mongoose";

export interface MovieSchemaInterface extends Document {
  tmdb_id?: Number;
  isPremiumContent: boolean;
  title: string;
  description: string;
  videoUrl?: string;
  thumbnailUrl: string;
  genre: string;
  duration?: string;
  adult: boolean;
  language: string;
  releaseDate: string;
  rating: number;
}

const MovieSchema = new mongoose.Schema({
  tmdb_id: {
    type: Number,
    required: false,
    default: 0,
  },
  isPremiumContent: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: false,
    default: "",
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: false,
    default: "10 minutes",
  },
  adult: {
    type: Boolean,
    required: true,
    default: false,
  },
  language: {
    type: String,
    required: true,
    default: "en",
  },
  releaseDate: {
    type: String,
    required: true,
    default: "15-11-2023",
  },
  rating: {
    type: Number,
    required: true,
    default: 7.2,
  },
});

const Movie = models.Movie || mongoose.model("Movie", MovieSchema);
export default Movie;
