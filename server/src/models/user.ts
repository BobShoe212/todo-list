import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  uid: String,
  todos: [String],
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
