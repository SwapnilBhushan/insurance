const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();

const PolicyHolder = require("./models/policyHolders");
const Claims = require("./models/claims");
const policyRoutes = require("./routes/policy");
const claimsRoutes = require("./routes/claim");

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/policy", policyRoutes);
app.use("/api/claim", claimsRoutes);

//database connection
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server started at Port ${process.env.PORT}`);
});
