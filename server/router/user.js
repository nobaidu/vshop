//用户注册
const mongoose = require("mongoose");
const userSchema = require("../schema/user");
const router = require("koa-router")();

//加密
const bcrypt = require("bcrypt");

// userSchema.pre("save", next => {
//     bcrypt.genSalt("SALT_WORK_FACTOR", (err, salt) => {
//         if (err) {
//             throw err;
//             return;
//         }
//         bcrypt.hash(this.password.salt, (err, hash) => {
//             if (err) {
//                 throw err;
//                 return;
//             }
//             this.password = hash;
//             next();
//         });
//     });
// });

router.get("/", async ctx => {
    ctx.body = "index";
});

router.post("/register", async ctx => {
    const User = mongoose.model("User", userSchema, "user");
    let newUser = new User(ctx.request.body);
    console.log(newUser);

    await newUser
        .save()
        .then(() => {
            ctx.body = {
                code: 200,
                message: " 注册成功"
            };
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                message: err
            };
        });
});

module.exports = router;