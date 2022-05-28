const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");



//LOGIN
router.get("/", async (req, res) => {
  // let others = {
  //     username: "Welcome",

  // }
  // try {

  const others  = 
  [
    {
      photo:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FPAPER-PLANE-DESIGN-Collage-Style-7%2Fdp%2FB08TT7W9QY&psig=AOvVaw0svqvL8LJPWkRQDUTEmstd&ust=1653799116225000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLCqrfmvgfgCFQAAAAAdAAAAABAD",
      categories:[],
      _id:"redirect_url_id",
      title:"string",
      createdAt:"date",
      desc:"post description"
    },
    
    ]

  //   const user = await User.findOne({ username: req.body.username });
  //   !user && res.status(400).json("Wrong credentials!");

  //   const validated = await bcrypt.compare(req.body.password, user.password);
  //   !validated && res.status(400).json("Wrong credentials!");

  //   const { password, ...others } = user._doc;
    res.status(200).json(others);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;
