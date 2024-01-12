const express = require("express");
require("dotenv").config();
const Crouter = express.Router();
const { ClientModel } = require("../Model/clientStudentModal");
const { authenticator } = require("../MiddleWare/authentication");
const messages = require("../utils/messages");

// Adding a Query By Customer/Client
Crouter.post("/", async (req, res) => {
  try {
    const { name, email, courseInterest, phone } = req.body;
    let enquiry = new ClientModel({
      name,
      email,
      courseInterest,
      phone,
    });

    await enquiry.save();

    return res.status(200).send({
      sucess: true,
      message: messages.ENQUIRY_SUBMIT_SUCESS,
      data: enquiry,
    });
  } catch (error) {
    console.error("Error submitting enquiry:", error.message);

    return res.status(500).send({
      sucess: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error),
    });
  }
});

// Public Enquiries
Crouter.get("/public", authenticator, async (req, res) => {
  try {
    const enquiries = await ClientModel.find({ claimedBy: null });

    return res.status(200).send({
      sucess: true,
      message: messages.RECORDS_FETCHED_SUCESS,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching public enquiries:", error.message);

    return res.status(500).send({
      sucess: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error),
    });
  }
});

// Claiming
Crouter.post("/:enquiryId/claim", authenticator, async (req, res) => {
  try {
    const { enquiryId } = req.params;
    const employeeId = req.employeeId;
    const updatedEnquiry = await ClientModel.findByIdAndUpdate(
      enquiryId,
      { $set: { claimedBy: employeeId } },
      { new: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).send({
        success: false,
        message: messages.ENQUIRY_NOT_FOUND,
      });
    }

    return res.status(200).send({
      success: true,
      message: messages.ENQUIRY_CLAIMED_SUCESS,
    });
  } catch (error) {
    console.error("Error claiming enquiry:", error);

    return res.status(500).send({
      sucess: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error),
    });
  }
});

// Claimed
Crouter.get("/claimed", authenticator, async (req, res) => {
  try {
    const employeeId = req.employeeId;

    // Fetch all leads claimed by the logged-in user
    const claimedLeads = await ClientModel.find({ claimedBy: employeeId });

    return res.status(200).send({
      success: true,
      message: messages.RECORDS_FETCHED_SUCESS,
      data: claimedLeads,
    });
  } catch (error) {
    console.error("Error fetching claimed leads:", error.message);
    return res.status(500).send({
      sucess: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error),
    });
  }
});

module.exports = { Crouter };
