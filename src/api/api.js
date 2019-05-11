//前端接口

const apiURL =
    "https://www.easy-mock.com/mock/5cd37e30fd9bee731a3c9b35/vshop-api/";
const serverURL = "http://localhost:3000/";

const Api = {
    indexGoods: apiURL + "index", //首页商品
    userRegister: serverURL + "user/register",//用户注册
    userLogin: serverURL + "user/login" //用户登录
};

module.exports = Api;