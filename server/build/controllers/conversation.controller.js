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
var router = require("express").Router();
var conversation_model_1 = require("../models/conversation.model");
var conversationCTL = {
    //new conv
    postConversation: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var newConversation, savedConversation, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newConversation = new conversation_model_1["default"]({
                        members: [req.body.senderId, req.body.receiverId]
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, newConversation.save()];
                case 2:
                    savedConversation = _a.sent();
                    res.status(200).json(savedConversation);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    res.status(500).json(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    //get conv of a user
    getConvOfUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var conversation, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, conversation_model_1["default"].find({
                            members: { $in: [req.params.userId] }
                        })];
                case 1:
                    conversation = _a.sent();
                    res.status(200).json(conversation);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    res.status(500).json(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // get conv includes two userId
    getConvInTwoUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var conversation, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, conversation_model_1["default"].findOne({
                            members: { $all: [req.params.firstUserId, req.params.secondUserId] }
                        })];
                case 1:
                    conversation = _a.sent();
                    res.status(200).json(conversation);
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    res.status(500).json(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }
};
exports["default"] = conversationCTL;
