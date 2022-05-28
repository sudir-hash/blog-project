const router = require("express").Router();
const User = require("../models/User");
// const Post = require("../models/Post");

const connection = require("../config/config");
const { json } = require("express");



class Post{
  constructor(title, desc, photo, username, categories){
    this.title = title;
    this.desc = desc;
    this.photo = photo;

  }
  toJSON(){
    return Json.stringify(this);
  }

}


//CREATE POST
router.post("/", async (req, res) => {
  const newPost = [req.body.title, req.body.desc, req.body.photo, req.body.username, req.body.categories];
  try {
    // const savedPost = await newPost.save();
    console.log("newPost", newPost);
    connection.query('INSERT INTO Posts(title,description,photo,username, categories) values(?,?,?,?,?) ', newPost, function (err, results, fields) {
      if(err){
        console.log("error",err)
      }
    })
    let results = connection.query('SELECT id FROM Posts where title  = ?',req.body.title, function (err, results, fields) {
      
    })
    // newPost.id = results.id;
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
// router.put("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         const updatedPost = await Post.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: req.body,
//           },
//           { new: true }
//         );
//         res.status(200).json(updatedPost);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can update only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE POST
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         await post.delete();
//         res.status(200).json("Post has been deleted...");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can delete only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      // posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
