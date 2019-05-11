//用户注册
const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");
const router = require("koa-router")();

const User = mongoose.model("User", userSchema, "user");

router.get("/", async ctx => {
    ctx.body = "index";
});

router.post("/register", async ctx => {
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
            console.log(err);

        });
});

router.post("/login", async ctx => {
    let loginUser = ctx.request.body;
    let username = loginUser.username;
    let password = loginUser.password;

    await User.findOne({ username: username })
        .exec()
        .then(async res => {
            console.log(res);
            if (res) {
                console.log(User)
                //当用户名存在时，开始比对密码
                let newUser = new User(); //因为是实例方法，所以要new出对象，才能调用
                await newUser
                    .comparePassword(password, res.password)
                    .then((isMatch) => {
                        //返回比对结果
                        ctx.body = { code: 200, message: isMatch };
                    })
                    .catch(error => {
                        //出现异常，返回异常
                        console.log(error);
                        ctx.body = { code: 500, message: error };
                    });
            } else {
                ctx.body = { code: 200, message: "用户名不存在" };
            }
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
