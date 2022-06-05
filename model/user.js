const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入您的名字'],
    },
    email: {
      type: String,
      required: [true, '請輸入您的 Email'],
      unique: true,
      select: false,
    },
    avatar: {
      type: String,
      required: [true, '請上傳您的頭像圖片位址'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users',
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
