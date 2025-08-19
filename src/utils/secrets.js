const dotenv = require("dotenv");
dotenv.config(); // load .env file

const PORT = process.env.PORT || 3000; // fallback just in case
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  PORT,
  MONGODB_URI,
  NODE_ENV,
  JWT_SECRET,
};
