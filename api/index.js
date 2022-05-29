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

app.use("/api/", homeRoute);
// app.use("/api/users", userRoute);
// app.use("/api/categories", categoryRoute);

/**
 * auth routes
 */

/**
 * @deprecated
 * @version 1.0
 */

// app.post("/api/auth/register", async (req, res) => {
//   let username = req.body.username;
//   let password = req.body.password;
//   let email = req.body.email;
//   let user = {
//     username: username,
//     password: password,
//     message: "Post successful",
//   }
//   console.log("Post Data", user);

//   try {

//     if(username&&password&&email){
//       let query   = 'INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)';
//       let values  = [username, password, email];
//       connection.query(query,values, (error, results, fields)=> {

//             if(error){
//               console.log("error",error)
//             }
//             console.log(results)
//           })
//       res.status(200).json("Post successful");
//     }
//   }catch(err){
//     console.log(err);
//     res.status(500).json({
//       err     : err,
//       message : "Error in login",
//     });
//   }
//   res.end();

// });

/**
 * @version 1.1 
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
  res_obj=  {
    "status": "success",
    "message": "Post successful",
  }
  try {

    if(username&&password&&email){
      let query   = 'INSERT INTO ACCOUNTS (USER_NAME, USER_PASSWORD, USER_EMAIL) VALUES (?, SHA2(?,256), ?)';
      let values  = [username, password, email];
      connection.query(query,values, (error, results, fields)=> {

            if(error){
              console.log("error",error)
            }
            console.log(results)
          })
      
      res.status(200).json(res_obj);
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


/**
 * @deprecated
 * @version 1.0
 */

// app.post("/api/auth/login", (req, res) => {
//   let username = req.body.username;
//   let password = req.body.password;
//   try {

//     if(username&&password){
//        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results, fields)=> {
//             if(error){
//               console.log("error",error)
//             }
//             if(results.length>0){
//               console.log("Results",results);
//               res.status(200).json({
//                 isValidUser : true,
//                 username    : username,
//               })
//             }else{
//               res.status(200).json({
//                   isValidUser:false,
//               })
//             }
//          })
//         }
 
//   }catch(err){
//     console.log(err);
//     res.status(500).json({
//       err     : err,
//       message : "Error in login",
//     });
//   }

// })

/**
 * @version 1.1
 */

app.post("/api/auth/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {

    if(username&&password){
       connection.query('SELECT * FROM ACCOUNTS WHERE USER_NAME = ? AND USER_PASSWORD = SHA2(?,256)', [username, password], (error, results, fields)=> {
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




// app.post("/api/add/posts", async (req, res) => {
//   const newPost = [req.body.title, req.body.desc, req.body.photo, req.body.username];
//   newPost.push(new Date().toISOString().slice(0, 19).replace('T', ' '));

//   console.log("Post Data", newPost);
//   try {
//     // const savedPost = await newPost.save();
//     connection.query('INSERT INTO Posts(title,description,photo,username, categories,Createdat) values(?,?,?,?,?,?) ', newPost, function (err, results, fields) {
//       if(err){
//         console.log("error",err)
//       }
//       // connection.query('SELECT id FROM Posts where title  = ?',req.body.title, function (err, results, fields) {
//       // })
      
//     })
//     res.status(200).json(newPost);
//     // newPost.id = results.id;
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

app.post("/api/add/posts", async (req, res) => {
  const newPost = [req.body.title, req.body.description, req.body.photo, req.body.username];
  newPost.push(new Date().toISOString().slice(0, 19).replace('T', ' '));
  try {
    // const savedPost = await newPost.save();
    connection.query('INSERT INTO POSTS(TITLE,DESCRIPTION,PHOTO,USER_NAME, CREATED_AT) values(?,?,?,?,?) ', newPost, function (err, results, fields) {
      if(err){
        console.log("error",err)
      }
      // connection.query('SELECT id FROM Posts where title  = ?',req.body.title, function (err, results, fields) {
      // })
      
    })
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});



/**
 * @deprecreated  
 */
// app.get("/api/get/all/posts", async (req, res) => {
//   try {
    
//     connection.query('SELECT * FROM Posts ',[], function (err, results, fields) {
//                   res.status(200).json(results);
//     })
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

/**
 * @version 1.1
 */
app.get("/api/get/all/posts", async (req, res) => {
  try {
    console.log("Get all posts");
    connection.query('SELECT * FROM POSTS ',[], function (err, results, fields) {
      console.log("Results",results);  

      res.status(200).json(results);
    })
  } catch (err) {
    res.status(500).json(err);
  }
});







// app.get("/api/get/one/post/:id", async (req, res) => {
//     console.log(req.params.id)
//   try {
    
//     let id  = req.params.id;
//     console.log(id);  

//     connection.query('SELECT * FROM Posts where id = ?',id, function (err, results, fields) {
      
//         res.status(200).json(results[0]);
//     })

//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

app.get("/api/get/one/post/:id", async (req, res) => {
  console.log(req.params.id)
try {
  
  let id  = req.params.id;
  console.log("REQUEST ID",id);  

  connection.query('SELECT * FROM POSTS where POST_ID = ?',id, function (err, results, fields) {
      console.log("Results",results);
      res.status(200).json(results[0]);
  })

} catch (err) {
  res.status(500).json(err);
}
});



app.delete("/api/delete/one/post/:id", async (req, res) => {
  try {
    let id  = req.params.id;
    console.log("REQID",id);  

    connection.query('DELETE FROM POSTS where POST_ID = ?',id, function (err, results, fields) {
      
        res.status(200).json(results);
    })

  } catch (err) {
    res.status(500).json(err);
  }
})


app.put("/api/update/one/post/:id", async (req, res) => {
  try {
    let id  = req.params.id;
    console.log(id);  

    connection.query('UPDATE POSTS SET TITLE = ?, DESCRIPTION = ?, USER_NAME = ? WHERE POST_ID = ?',[req.body.title, req.body.description, req.body.username, id], function (err, results, fields) {
        if(err){
          console.log("error",err)
        }
        res.status(200).json(results);
    })

  } catch (err) {
    res.status(500).json(err);
  }
})

app.delete("/api/user/delete/", async (req, res) => {
  
  console.log("Delete User"+req.body.username+" "+req.body.password);

  try {
    
    



    let username = req.body.username;
    let password = req.body.password;
    
    result_obj={
      message:`User ${username} deleted successfully`,
    }

    connection.query('DELETE FROM ACCOUNTS where USER_NAME = ? AND USER_PASSWORD = SHA2(?,256)',[username, password], function (err, results, fields) {
        if(err){
          console.log("error",err)
        }
        if(results.affectedRows > 0)  
            res.status(200).json(result_obj);
    })
  } catch (err) {
    res.status(500).json(err);
  }
})


// app.post("/api/posts/delete/all", async (req, res) => {
  
//   try {
//     // let id  = req.params.id;
//     // console.log(id);  
//     let username = req.body.username;
//     let password = req.body.password;
   
//     connection.query('DELETE FROM Posts where username = ?',username, function (err, results, fields) {
//         if(err){  console.log("error",err) }
//         res.status(200).json(results);
//     })

//     connection.query('DELETE FROM accounts where username = ? AND password = ?',[username, password], function (err, results, fields) {
//         if(err){
//           console.log("error",err)
//         }
//         res.status(200).json(results);
//     })
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })

app.listen("5000", () => {

  
  console.log("Backend is running.");


});
