const express = require("express");

const router = express.Router();
const userRouter = express.Router();

const auth = require("../middlewares/auth");
const AuthController = require("../controllers/AuthController");
// const PostController = require("../controllers/PostController");
// const CategoryController = require("../controllers/CategoryController");
// const AlbumController = require("../controllers/AlbumController");

// const {
//   registerValidationRules,
//   registerValidate,
//   loginValidationRules,
//   loginValidate,
// } = require("../middlewares/validators");

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

// router.post(
//   "/register",
//   registerValidationRules(),
//   registerValidate,
//   AuthController.register
// );

// router.post(
//   "/login",
//   loginValidationRules(),
//   loginValidate,
//   AuthController.login
// );

// //grouping routes
// userRouter.use(auth);

// // storing data
// router.post("/category/store", auth, CategoryController.storeCategory);
// router.post("/album/store", auth, PostController.storeAlbum);
// router.post("/post/store", auth, AlbumController.storePost);

// //fetching data
// router.get("/posts/:id", auth, PostController.getPostsByUserId);
// router.get("/post/:id", auth, PostController.getPostById);
// router.get("/categories/:id", auth, CategoryController.getCategoriesByUserId);
// router.get("/category/:id", auth, CategoryController.getCategoryById);
// router.get("/albums/:id", auth, AlbumController.getAlbumsByUserId);
// router.get("/album/:id", auth, AlbumController.getAlbumById);

module.exports = router;
