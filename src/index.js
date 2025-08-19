//on this side creating server

const express = require("express");
const { PORT } = require("./utils/secrets");
const connectDB = require("./utils/database.config");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");

app.use(cors({ origins: "*" }));
app.use(express.json());

void connectDB();
app.use(
  "/",
  (req, res, next) => {
    console.log(`Request URL: ${req.url}`);

    next();
  },
  routes
);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost: ${PORT}`);
});
