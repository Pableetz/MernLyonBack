const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = 8080;
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

mongoose
  .connect("mongodb://localhost:27017/cirquearlettegrus", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
