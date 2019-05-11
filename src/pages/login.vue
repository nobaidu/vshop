<template>
    <div>
        <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack"/>

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
                    @click="userLogin"
                    :loading="openLoading"
                    size="large"
                >马上登录</van-button>
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
        userLogin() {
            axios({
                method: "post",
                url: api.userLogin,
                data: {
                    username: this.username,
                    password: this.password
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.data.code == 200 && res.data.message) {
                        Toast.success("登录成功");
                        // this.$router.push("/");
                    } else {
                        Toast.fail("登录失败");
                        this.openLoading = false;
                    }
                })
                .catch(res => {
                    Toast.fail("登录失败");
                    this.openLoading = false;
                });
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