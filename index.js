const express = require("express");
require("dotenv").config();
const app = express();
const { connection } = require("./Config/db");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
const { Erouter } = require("./Routes/employeeRoutes");
const { Crouter } = require("./Routes/clientRoutes");
const messages = require("./utils/messages");



app.use("/enquiries", Crouter);

app.use("/", Erouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(messages.DB_CONNECTION_SUCESS);
  } catch (error) {
    console.log({ message: error.message });
  }
  console.log(`Server is runninng at ${process.env.port}`);
});
