const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const messages = require("../utils/messages");
require("dotenv").config();

const authenticator = (req, res, next) => {
  try {
    let token = req.cookies.Token;
    if (token) {
      jwt.verify(token, process.env.key, (err, decodedToken) => {
        if (decodedToken) {
          req.employeeId = decodedToken.employeeId;
          next();
        } else {
          return res.status(401).send({
            success: false,
            message: messages.INVALID_TOKEN,
          });
        }
      });
    } else {
      return res.status(401).send({
        success: false,
        message: messages.TOKEN_NOT_FOUND,
      });
    }
  } catch (error) {
    return res.status(500).send({
      sucess: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error),
    });
  }
};

module.exports = { authenticator };
