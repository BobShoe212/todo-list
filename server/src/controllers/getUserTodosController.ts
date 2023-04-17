import { Request, Response } from "express";
import User from "../models/user";

//find and send the list of todos from the mongo db by the uid sent in the request
export async function getUserTodosController(req: Request, res: Response) {
  const { userId } = req.params;
  const user = await User.findOne({ uid: userId });
  res.send(JSON.stringify(user));
}
