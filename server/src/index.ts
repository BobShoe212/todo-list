import { config } from "dotenv";
config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { getUserTodosController } from "./controllers/getUserTodosController";
import { setUserTodosController } from "./controllers/setUserTodosController";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//controllers for requests from /todos
app.get("/todos/:userId", getUserTodosController); //get /todos will respond with the full list of todos using getUserTodosController
app.post("/todos/:userId", setUserTodosController); //post /todos will save a given video url and category using addUserTodosController

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`Server listening on port ${port}`);
  app.listen(port);
});
