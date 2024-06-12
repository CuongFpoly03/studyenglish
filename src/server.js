const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const route = require("./routes/index");
const connectDB = require("./database/mongoo");
const cookieparser = require("cookie-parser")
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect cors
app.use(cors());

//connect cookie parser
app.use(cookieparser());

//connect route
route(app);

//cnnect morgan
app.use(morgan());
//connect db
connectDB();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Run server sucesss !");
});
