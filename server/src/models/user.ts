import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const Todo = new Schema({
  task: String,
  isChecked: Boolean,
});

export const UserSchema = new Schema({
  uid: String,
  todos: [Todo],
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
