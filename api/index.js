const express = require("express");
const app = express();
const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const authRoute = require("./routes/auth");
const homeRoute = require("./routes/home");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const connection  = require("./config/config");
const cors = require("cors");




dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors());

// app.use("/api/auth", authRoute);
app.use("/api/", homeRoute);
app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

/**
 * auth routes
 */
app.post("/api/auth/register", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let user = {
    username: username,
    password: password,
    message: "Post successful",
  }
  console.log("Post Data", user);

  try {

    if(username&&password&&email){
      let query   = 'INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)';
      let values  = [username, password, email];
      connection.query(query,values, (error, results, fields)=> {

            if(error){
              console.log("error",error)
            }
            console.log(results)
          })
      res.status(200).json("Post successful");
    }
  }catch(err){
    console.log(err);
    res.status(500).json({
      err     : err,
      message : "Error in login",
    });
  }
  res.end();

});



app.post("/api/auth/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {

    if(username&&password){
       connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results, fields)=> {
            if(error){
              console.log("error",error)
            }
            if(results.length>0){
              console.log("Results",results);
              res.status(200).json({
                isValidUser : true,
                username    : username,
              })
            }else{
              res.status(200).json({
                  isValidUser:false,
              })
            }
         })
        }
 
  }catch(err){
    console.log(err);
    res.status(500).json({
      err     : err,
      message : "Error in login",
    });
  }

})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});




app.post("/api/posts", async (req, res) => {
  const newPost = [req.body.title, req.body.desc, req.body.photo, req.body.username, req.body.categories];
  newPost.push(new Date().toISOString().slice(0, 19).replace('T', ' '));
  try {
    // const savedPost = await newPost.save();
    connection.query('INSERT INTO Posts(title,description,photo,username, categories,Createdat) values(?,?,?,?,?,?) ', newPost, function (err, results, fields) {
      if(err){
        console.log("error",err)
      }
      // connection.query('SELECT id FROM Posts where title  = ?',req.body.title, function (err, results, fields) {
      // })
      
    })
    res.status(200).json(newPost);
    // newPost.id = results.id;
  } catch (err) {
    res.status(500).json(err);
  }
});


app.get("/api/posts", async (req, res) => {
  // const username = req.query.user;
  // const catName = req.query.cat;
  try {
    // let posts;
    // if (username) {
    //   // posts = await Post.find({ username });
    // } else if (catName) {
    //   posts = await Post.find({
    //     categories: {
    //       $in: [catName],
    //     },
    //   });
    // } else {
    //   posts = await Post.find();
    // }
    connection.query('SELECT * FROM Posts ',[], function (err, results, fields) {
                  res.status(200).json(results);
    })


    // res.status(200).json(r);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/posts/one/:id", async (req, res) => {
    console.log(req.params.id)
  try {
    
    let id  = req.params.id;
    console.log(id);  

    connection.query('SELECT * FROM Posts where id = ?',id, function (err, results, fields) {
      
        res.status(200).json(results[0]);
    })

  } catch (err) {
    res.status(500).json(err);
  }
});



app.listen("5000", () => {

  
  console.log("Backend is running.");


});
