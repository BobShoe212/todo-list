import { config } from "dotenv";
config();
import express from "express";
import mongoose from "mongoose";
import { getUserTodosController } from "./controllers/getUserTodosController";
import { setUserTodosController } from "./controllers/setUserTodosController";

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//controllers for requests from /todos
app.get("/todos", getUserTodosController); //get /todos will respond with the full list of todos using getUserTodosController
app.post("/todos", setUserTodosController); //post /todos will save a given video url and category using addUserTodosController

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Server listening on port ${port}`);
  app.listen(port);
});
