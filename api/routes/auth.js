const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const connection  =  require("../config/config");

//REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(req.body.password, salt);
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPass,
//     });

//     const user = await newUser.save();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", async (req, res) => {
  let connectionStatus  = connection.state;
  res.send('Auth Page'+'\n'+`Connection Status  : ${connectionStatus}` + '\n' + 'Available Routes' + '\n' + '/register' + '\n' + '/login');

})


router.post("/register", async (req, res) => {
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






router.post("/login", async (req, res) => {
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


  res.end();

});


//LOGIN
// router.post("/login", async (req, res) => {
//   try {

//     let username = req.body.username;
//     let password = req.body.password;


//     const result =  JSON.stringify(
//       {
//       username  : username,
//       password  : password,
//       message   : "Post successful",
//       }
//     );
//     // res.sendStatus(200).json(result);
//     res.sendStatus(200);
//     res.send(result);
//     // let username  = "test";
//     // let password  = "test";  


//     // if (username && password) {
//     //   connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, results, fields)=> {
//     //     // If there is an issue with the query, output the error
//     //     if(fields) {console.log("Filelds: ", fields);}

//     //     // if (error) throw error;
//     //     if(error) {console.error(error);}
//     //     // If the account exists
//     //     if (results.length > 0) {
//     //       // request.session.loggedin = true;
//     //       // request.session.username = username;

//     //     const result_obj = {message  : "Welcome back, " + username + "!"};
//     //       response.status(200).json(result_obj);

//     //     } 
//     //     else {
//     //       const result_obj = {message  : "Wrong credentials!"};
//     //       response.send(result_obj);

//     //     }			
//     //     response.end();
//     //   });
//     // } else {
//     //   response.send('Please enter Username and Password!');

//     //   response.end();


//     // res.status(200).json(others);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;