const express = require("express");
const cors = require("cors");

require("dotenv").config();

const { connectDB } = require("./config/db");

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    message: "This worked, right?",
  });
});
app.use("/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/notesRoutes"));

app.listen(port, () => {
  console.log(`App running on PORT number ${port}`);
});
