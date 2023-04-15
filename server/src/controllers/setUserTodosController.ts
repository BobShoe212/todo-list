import { Request, Response } from "express";
import User, { UserSchema } from "../models/user";

//find and send the list of videos from the mongo db
export async function setUserTodosController(req: Request, res: Response) {
  const user = await User.findOneAndUpdate(
    { uid: req.body.uid },
    { todos: req.body.todos }
  );
}
