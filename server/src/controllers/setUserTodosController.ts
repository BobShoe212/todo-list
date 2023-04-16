import { Request, Response } from "express";
import User from "../models/user";

//find and send the list of videos from the mongo db
export async function setUserTodosController(req: Request, res: Response) {
  const { userId } = req.params;
  const { todos } = req.body;
  const user = await User.findOneAndUpdate({ uid: userId }, { todos: todos });
  if (!user) {
    const newUser = new User({ uid: userId, todos: todos });
    await newUser.save();
  }
  res.json(await User.findOne({ uid: userId }));
}
