import * as express from "express";
import { Request, Response } from "express";
import accountModel from "../models/account.model";
import * as dotenv from "dotenv";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
import { sendMail } from "../config/sendMail.config";

dotenv.config();

export const authController = {
  getLogin: (req: Request, res: Response) => {
    res.render("auth/login.pug");
  },
  getRegister: (req: Request, res: Response) => {
    res.render("auth/register.pug");
  },
  postLogin: async (req: Request, res: Response) => {
    console.log(`login page`);
    const { email, pass } = req.body;
    if (!email || !pass)
      return res.status(400).json({
        success: false,
        message: "email or pass trong ",
      });

    try {
      const emailName = await accountModel.findOne({ email });

      if (!emailName)
        return res.status(400).json({
          success: false,
          message: "tai khoan khong co ton tai",
        });
      if (pass != emailName.pass)
        return res.status(400).json({
          success: false,
          message: "mat khau or tai khoan k dung",
        });
      res.cookie("cookie_id", emailName.id, {
        signed: true,
      });

      res.json({ emailName });
      // res.redirect("/product");
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: "error",
      });
    }
  },
  postRegister: async (req: Request, res: Response) => {
    console.log("postRegister");
    const { email } = req.body;
    const pass = "123456";
    if (!email)
      return res.status(400).json({
        success: false,
        message: "email trong ",
      });

    try {
      const emailName = await accountModel.findOne({ email });
      if (emailName)
        return res.status(400).json({
          success: false,
          message: "email da ton tai",
        });

      const newAccount = await accountModel.create({
        email,
        pass,
      });
      sendMail({
        to: email, // Change to your recipient
        from: "support@6weeks.vn", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        text: "password with email address is: 123456 . after login please change password",
      });
      res.json(newAccount);
      // res.render("auth/login");
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  updatePassword: async (req:Request, res:Response) => {
    // const id = req.singedCookies.cookie_id;
    console.log("updatePassword");
    const id = req.params.id;
    const account = await accountModel.findById(id);
    console.log("updatePassword", account);
    const {passOld, passNew, passFinal} = req.body;
    console.log(passOld, passNew, passFinal);
    if(passOld!== account.pass){
      
      res.status(403).json({
        message:"Pass false"
      })
    }
    if(passNew === passOld){
      res.status(403).json({
        message:"mat khau phai thay doi!!!!"
      })
    }
    if(passFinal === passNew){
      const newAccount =  await accountModel.findByIdAndUpdate(id, {pass: passNew});
      res.json(newAccount);
    }
  }
  ,
  deleteLogin: (req: any, res: Response) => {
    res.clearCookie("cookie_id");
    res.redirect("/auth/login");
  },
};
