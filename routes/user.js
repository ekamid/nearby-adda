const express = require("express");
const userRouter = express.Router();

//importing auth middleware
const auth = require("../middlewares/auth");

//controllers
const PostController = require("../controllers/PostController");
const CategoryController = require("../controllers/CategoryController");
const AlbumController = require("../controllers/AlbumController");

//grouping routes for only authenticated user
userRouter.use(auth); //checks if user is authenticated
userRouter.post("/category/store", CategoryController.storeCategory);
userRouter.post("/album/store", AlbumController.storeAlbum);
userRouter.post("/post/store", PostController.storePost);
userRouter.get("/posts/:id", PostController.getPostsByUserId);
userRouter.get("/post/:id", PostController.getPostById);
userRouter.get("/categories/:id", CategoryController.getCategoriesByUserId);
userRouter.get("/category/:id", CategoryController.getCategoryById);

module.exports = userRouter;
