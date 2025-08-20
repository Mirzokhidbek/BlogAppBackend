//on this side creating server

const express = require("express");
const { PORT } = require("./utils/secrets");
const connectDB = require("./utils/database.config");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");
const errorMiddleware = require("./middleware/error.middleware");

app.use(cors({ origins: "*" }));
app.use(express.json());

void connectDB();
app.use("/", routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost: ${PORT}`);
});
