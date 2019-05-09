// 文档模式匹配

const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  userId: ObjectId,
  username: {
    type: String,
    unique: true
  },
  password: String,
  createAt: {
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = userSchema;
