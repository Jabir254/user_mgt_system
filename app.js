require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const cors = require("cors");

const app = express();
const port = 5000 || process.env.PORT;

//connect to database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//static folder
app.use(express.static("public"));

//template engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//Routes
app.use("/", require("./server/routes/customer"));

//404 error page
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
