require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 5000 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static folder
app.use(express.static("public"));

//template engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//home

// app.get("/", (req, res) => {
//   const locals = {
//     title: "Nodejs",
//   };
//   res.render("index", locals);
// });

//404 error page
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
