const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const Erouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { employeeModel } = require("../Model/employeeModal");
const messages = require("../utils/messages");

Erouter.get("/", (req, res) => {
  return res.status(200).send({
    sucess: true,
    message: messages.WELCOME,
  });
});

//Register
Erouter.post("/register", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const userExist = employeeModel.findOne({ email });
    if (userExist) {
      return res.status(401).send({
        success: false,
        message: messages.ALREADY_REGISTERED,
      });
    }
    bcrypt.hash(password, +process.env.saltround, async (err, hash) => {
      if (err) {
        console.log({ message: err.message });
      } else {
        let user = new employeeModel({
          name,
          email,
          password: hash,
        });

        await user.save();

        return res.status(200).send({
          sucess: true,
          message: messages.REGISTERED_SUCESSFULLY,
          data: user,
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      sucess: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error),
    });
  }
});

//login
Erouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await employeeModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ employeeId: user._id }, process.env.key, {
            expiresIn: 100,
          });

          res.cookie("Token", token);
          return res.status(200).send({
            success: true,
            message: messages.LOGIN_SUCCESS,
            token,
          });
        } else {
          return res.status(401).send({
            success: false,
            message: messages.INVALID_PASSWORD,
          });
        }
      });
    } else {
      return res.status(404).send({
        success: false,
        message: messages.USER_NOT_FOUND,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      sucess: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error),
    });
  }
});

// Logout
Erouter.get("/logout", (req, res) => {
  try {
    // Clear the token cookie by setting an empty value and expiration in the past
    res.cookie("Token", "", { expires: new Date(0) });
    return res.status(200).send({
      success: true,
      message: messages.LOGOUT_SUCESS,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      sucess: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error),
    });
  }
});

module.exports = { Erouter };