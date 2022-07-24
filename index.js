const express = require("express");
const cookieParser = require('cookie-parser')
const path = require("path");
const app = express();
const UserRouter = require("./router/userRouter");
const indexRouter = require("./router/indexRouter");
const TodoRouter = require("./router/todoRouter");

app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use("/user", UserRouter);
app.use("/index", indexRouter);
app.use('/todo', TodoRouter)

app.get("/dangky", function (req, res) {
  res.sendFile(path.join(__dirname, "./views/dangky.html"));
});

app.listen(3000);
