import mongoose, { Schema, models } from "mongoose";

interface UserSchemaInterface {
  _id: string;
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  isPremiumUser: boolean;
  premiumType: string;
  familyMembers?: Array<string>;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    default:
      "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg",
  },
  isPremiumUser: {
    type: Boolean,
    required: true,
    default: false,
  },
  premiumType: {
    type: String,
    required: true,
    default: "Silver",
  },
  familyMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = models.User || mongoose.model("User", UserSchema);
export { type UserSchemaInterface };
export default User;
