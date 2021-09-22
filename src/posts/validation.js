// import { checkSchema } from "express-validator";
import {body } from "express-validator"

// const schema = { 
// title: {
//   in:['body'], isString:{errorMessage:'Validation error'}
// }
// , category :{
//   in:['body'], isString:{errorMessage:'Validation error'}
// },
// content :{
//   in:['body'], isString:{errorMessage:'Validation error'}
// }, 
// author :{
//   in:['body'], isString:{errorMessage:'Validation'}
// }, 



// }
export const postValidation = [
  body("category").exists().withMessage("Category is a mandatory"),
  body("title").exists().withMessage("Title is a mandatory "),
  body("content").exists().withMessage("Content is a mandatory "),
];

// const checkBlogPostSchema = checkSchema(schema)