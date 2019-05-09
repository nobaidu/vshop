// 数据库连接

const glob = require("glob");
const path = require("path");
const mongoose = require("mongoose");
const db = "mongodb://127.0.0.1:27017/vshop";

mongoose.Promise = global.Promise;

exports.connect = () => {
  let maxConnectTimes = 0;
  mongoose.connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
  });

  return new Promise((resolve, reject) => {
    // 监听断开
    mongoose.connection.on("disconnected", () => {
      console.log("***********数据库断开***********");
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject();
        throw new Error("数据库出现问题，程序无法搞定，请人为修理......");
      }
    });

    mongoose.connection.on("error", err => {
      console.log("***********数据库错误***********");
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject(err);
        throw new Error("数据库出现问题，程序无法搞定，请人为修理......");
      }
    });

    //链接打开的时
    mongoose.connection.once("open", () => {
      console.log("**********数据库连接成功*********");
      resolve();
    });
  });
};

// exports.initSchema = () => {
//   glob.sync(path.join(__dirname, "./schema", "**/*.js")).forEach(require);
// };
