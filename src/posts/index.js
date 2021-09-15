import express from "express";
import fs from "fs";
import uniqid from "uniqid";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { postValidation } from "./validation.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const postFilePath = path.join(__dirname, "posts.json");

const blogPost = express.Router(); 



// 1. get all posts
blogPost.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(postFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// 2. create a new  post
blogPost.post("/",
 postValidation, 
async (req, res, next) => {
  try {
    const { category, title, cover, value, unit, name, avatar, content } = req.body;

    const post = {
      id: uniqid(),
      category,
      title,
      cover,
      value,
      unit,
      name,
      avatar,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const fileAsBuffer = fs.readFileSync(postFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);
    fileAsJSONArray.push(post);
    fs.writeFileSync(postFilePath, JSON.stringify(fileAsJSONArray));

    res.send(post);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});




// get single post
blogPost.get("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(postFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);
    const post = fileAsJSONArray.find((post) => post.id === req.params.id);
    if (!post) {
      res
        .status(404)
        .send({ message: `Post with ${req.params.id} is not found!` });
    }
    res.send(post);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});



// delete  post
blogPost.delete("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(postFilePath);

    const fileAsString = fileAsBuffer.toString();

    let fileAsJSONArray = JSON.parse(fileAsString);

    const post = fileAsJSONArray.find(
      (post) => post.id === req.params.id
    );
    if (!post) {
      res
        .status(404)
        .send({ message: `Post with ${req.params.id} is not found!` });
    }
    fileAsJSONArray = fileAsJSONArray.filter(
      (post) => post.id !== req.params.id
    );
    fs.writeFileSync(postFilePath, JSON.stringify(fileAsJSONArray));
    res.status(204).send();
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

//  update posttt
blogPost.put("/:id", 
 postValidation, 
async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(postFilePath);
    const fileAsString = fileAsBuffer.toString();
    let fileAsJSONArray = JSON.parse(fileAsString);

    const postIndex = fileAsJSONArray.findIndex(
      (post) => post.id === req.params.id
    );
    if (!postIndex == -1) {
      res
        .status(404)
        .send({ message: `Post with ${req.params.id} is not found!` });
    }
    const previousPostData = fileAsJSONArray[postIndex];
    const changedPost = {
      ...previousPostData,
      ...req.body,
      updatedAt: new Date(),
      id: req.params.id,
    };
    fileAsJSONArray[postIndex] = changedPost;

    fs.writeFileSync(postFilePath, JSON.stringify(fileAsJSONArray));
    res.send(changedPost);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

export default blogPost;
