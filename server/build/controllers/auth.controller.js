"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.authController = void 0;
var account_model_1 = require("../models/account.model");
var dotenv = require("dotenv");
var sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var sendMail_config_1 = require("../config/sendMail.config");
dotenv.config();
exports.authController = {
    getLogin: function (req, res) {
        res.render("auth/login.pug");
    },
    getRegister: function (req, res) {
        res.render("auth/register.pug");
    },
    postLogin: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, pass, emailName, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("login page");
                    _a = req.body, email = _a.email, pass = _a.pass;
                    if (!email || !pass)
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: "email or pass trong "
                            })];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, account_model_1["default"].findOne({ email: email })];
                case 2:
                    emailName = _b.sent();
                    if (!emailName)
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: "tai khoan khong co ton tai"
                            })];
                    if (pass != emailName.pass)
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: "mat khau or tai khoan k dung"
                            })];
                    res.cookie("cookie_id", emailName.id, {
                        signed: true
                    });
                    res.json({ emailName: emailName });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.log(error_1);
                    res.status(500).json({
                        success: false,
                        message: "error"
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    postRegister: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var email, pass, emailName, newAccount, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("postRegister");
                    email = req.body.email;
                    pass = "123456";
                    if (!email)
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: "email trong "
                            })];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, account_model_1["default"].findOne({ email: email })];
                case 2:
                    emailName = _a.sent();
                    if (emailName)
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: "email da ton tai"
                            })];
                    return [4 /*yield*/, account_model_1["default"].create({
                            email: email,
                            pass: pass
                        })];
                case 3:
                    newAccount = _a.sent();
                    (0, sendMail_config_1.sendMail)({
                        to: email,
                        from: "support@6weeks.vn",
                        subject: "Sending with SendGrid is Fun",
                        text: "password with email address is: 123456 . after login please change password"
                    });
                    res.json(newAccount);
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.status(500).json({
                        success: false,
                        message: error_2
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    updatePassword: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, account, _a, passOld, passNew, passFinal, newAccount;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // const id = req.singedCookies.cookie_id;
                    console.log("updatePassword");
                    id = req.params.id;
                    return [4 /*yield*/, account_model_1["default"].findById(id)];
                case 1:
                    account = _b.sent();
                    console.log("updatePassword", account);
                    _a = req.body, passOld = _a.passOld, passNew = _a.passNew, passFinal = _a.passFinal;
                    console.log(passOld, passNew, passFinal);
                    if (passOld !== account.pass) {
                        res.status(403).json({
                            message: "Pass false"
                        });
                    }
                    if (passNew === passOld) {
                        res.status(403).json({
                            message: "mat khau phai thay doi!!!!"
                        });
                    }
                    if (!(passFinal === passNew)) return [3 /*break*/, 3];
                    return [4 /*yield*/, account_model_1["default"].findByIdAndUpdate(id, { pass: passNew })];
                case 2:
                    newAccount = _b.sent();
                    res.json(newAccount);
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); },
    deleteLogin: function (req, res) {
        res.clearCookie("cookie_id");
        res.redirect("/auth/login");
    }
};
