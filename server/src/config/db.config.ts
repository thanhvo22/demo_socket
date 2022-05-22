
import * as dotenv from "dotenv";
require("dotenv").config();

const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/socket");
    console.log("connecting successfully hhhh");
  } catch (error) {
    console.log("failllllllllll");
  }
}
module.exports = { connect };
