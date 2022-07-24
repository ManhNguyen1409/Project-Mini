const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

router.get("/", function (req, res) {
  userModel
    .find()
    .then(function (data) {
      res.json(data);
      console.log(10 ,req.cookies.userID);
    })
    .catch(function (err) {
      res.json({ err });
    });
});
router.get("/:id", function (req, res) {
  userModel
    .findOne({ _id: req.params.id })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json({ err });
    });
});

router.post("/", function (req, res) {
  const username = "test";
  console.log(req.body);
  userModel.findOne({ username: req.body.username }).then(function (data) {
    if (data) {
      res.json("data da ton tai");
    } else {
      userModel
        .create({
          username: req.body.username,
          password: req.body.password,
        })
        .then(function (data) {
          res.json({ data, mess: "tao data thanh cong" });
        })
        .catch(function (err) {
          res.json({ err, mess: "loi sever" });
        });
    }
  });
});

router.put("/:id", function (req, res) {
  userModel
    .updateOne(
      {
        _id: req.params.id,
        username: req.body.username,
        password: req.body.password,
      },
      { password: req.body.newPass }
    )
    .then(function (data) {
      if (data.modifiedCount) {
        console.log(data);
        res.json({ data, mess: "update thanh cong" });
      } else {
        res.json({ mess: "sai username hoac password" });
      }
    })
    .catch(function (err) {
      res.json(err);
    });
  console.log(req.body);
});


router.post('/login' , async (req,res) => {
  try {
    console.log(req.body);
  
    const user = await userModel.findOne({username: req.body.username,password: req.body.password})
    if(user){
      res.json({user, mess:'thanh cong'})
    }else{
      res.json({mess:'user khong ton tai '})
    }
  } catch (error) {
    res.json({mess:'loi sever'})
  }
})

module.exports = router;
