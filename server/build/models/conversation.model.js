"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var conversationSchema = new mongoose_1.Schema({
    members: {
        type: Array
    }
});
exports["default"] = (0, mongoose_1.model)("Conversation", conversationSchema);
