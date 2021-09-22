import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./authors/index.js";
import blogPost from "./posts/index.js";

const server = express();
const PORT = 3003;

server.use(cors());
server.use(express.json());
// server.use("/authors", authorsRouter);
server.use("/posts", blogPost);

server.get(
  "/middleware",
  (req, res, next) => {
    let num = req.query.num; //13
    num = parseInt(num);
    req.num = num;
    req.name = "Magda"
    console.log(req.num);
    next();
  },
  (req, res, next) => {
    req.num++; // 14
    console.log(req.name)
    next();
  },
  (req, res, next) => {
    req.num++;

    res.send({ num: req.num });
  },
  (req, res, next) => {
    req.num++;
    res.send({ num: req.num });
  }
);

console.log(listEndpoints(server));

server.listen(PORT, () => console.log("Server is running: ", PORT));

server.on("error", (error) =>
  console.log(` Server is not runnnnning  : ${error}`)
);
