<template>
    <div>
        <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"/>

        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
                :error-message="usernameErrorMsg"
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg"
            />
            <div class="register-button">
                <van-button
                    type="primary"
                    @click="userRegister"
                    :loading="openLoading"
                    size="large"
                >马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import api from "../api/api.js";
import { Toast, Field } from "vant";
export default {
    data() {
        return {
            username: "",
            password: "",
            openLoading: false,
            usernameErrorMsg: "", //验证用户名
            passwordErrorMsg: "" //验证密码
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        //检验表单
        checkForm() {
            let isok = true;
            if (this.username.length < 5) {
                this.usernameErrorMsg = "用户名不能小于5位";
                isok = false;
            } else {
                this.usernameErrorMsg = "";
            }

            if (this.password.length < 6) {
                this.passwordErrorMsg = "密码不能少于6位";
                isok = false;
            } else {
                this.passwordErrorMsg = "";
            }

            return isok;
        },
        userPost() {
            axios({
                method: "post",
                url: api.userRegister,
                data: {
                    username: this.username,
                    password: this.password
                }
            })
                .then(res => {
                    if (res.data.code == 200) {
                        Toast.success("注册成功");
                        this.$router.push("/");
                    } else {
                        console.log(res.data.message);
                        Toast.fail("注册失败");
                        this.openLoading = false;
                    }
                    console.log(res.data.code);
                })
                .catch(res => {
                    console.log(res);
                    Toast.fail("注册失败");
                    this.openLoading = false;
                });
        },
        userRegister() {
            this.checkForm() && this.userPost();
        }
    }
};
</script>

<style scoped>
.register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px;
}
.register-button {
    padding-top: 10px;
}
</style>