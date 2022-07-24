const express = require("express");
const router = express.Router();
const path = require("path");
const TodoModel = require("../model/todoModel");

router.post("/create", function (req, res) {
  TodoModel.create({
    name: req.body.name,
    deadline: new Date(req.body.deadline).toString(),
    status: req.body.status,
  })
    .then(function (data) {
      res.json({ mess: " Thành công" });
    })
    .catch(function (err) {
      res.json({ mess: "Thất bại" });
    });
});
router.get("/", function (req, res) {
  TodoModel.find()
    .then(function (data) {
      res.json({ data, mess: " Thành công" });
    })
    .catch(function (err) {
      res.json({ mess: "Thất bại" });
    });
});
router.put("/:id", function (req, res) {
  TodoModel.updateOne(
    { _id: req.params.id },
    {
      name: req.body.newname,
      deadline: new Date(req.body.newdeadline).toString(),

      status: req.body.newstatus,
    }
  ).then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    res.json(err);
  });
});
router.delete('/:id', function (req, res) {
    TodoModel.deleteOne({_id: req.params.id})
    .then(function (data) {
        res.json(data);
        
    }).catch(function (err) {
        res.json(err);
    })
})
module.exports = router;
