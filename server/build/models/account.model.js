"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var accountSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    name: {
        type: String
    }
}, { timestamps: true });
exports["default"] = (0, mongoose_1.model)("Account", accountSchema);
