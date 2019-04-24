<template>
  <div>
    <img src="../assets/13.jpg" alt="图片" class="imgbg">
    <div class="bigBox">
      <h1>深圳市航天泰瑞捷电子有限公司</h1>

      <div class="loginDiv">
        <div>
          <input type="text" name="userID" id v-model="userID" placeholder="请输入工号">
        </div>

        <div class="btnLogin">
          <button @click="login()" class="btn">登录</button>
          <div>{{result}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { encryptBy, decryptBy } from "../config/DES.JS";

export default {
  data() {
    return {
      userID: "",
      result: ""
    };
  },
  methods: {
    login() {
      if (this.userID === "") {
        window.alert("请填写工号");
      } else {
        this.result = "正在登录...请稍等...";
        let params = { userID: this.userID };
        this.$axios({
          method: "GET",
          url: "http://172.0.0.116:82/login",
          params: params,
          type: "json"
        })
          .then(response => {
            this.result = "";
            console.log(response);
            if (response.statusText === "OK") {
              if (response.data.recordsets[0].length === 0) {
                console.log(response.data.recordsets[0].length);
                window.alert("未查找到此账号");
              } else {
                console.log(response.data.recordsets[0][0].userID);
                console.log(response.data.recordsets[0][0].userName);
                let username = response.data.recordsets[0][0].userName;
                let userID = response.data.recordsets[0][0].userID;
                let Department = response.data.recordsets[0][0].Department;
                window.sessionStorage.setItem("username", username);
                window.sessionStorage.setItem("userid", userID);
                window.sessionStorage.setItem("Department", Department);
                this.$router.push("/weightMain");
              }
            } else {
              window.alert("未连接成功，请联系管理员");
              this.result = "";
            }
          })
          .catch(err => {
            console.log(err);
            // window.alert("工号未注册，请先注册");
            // window.alert("未连接成功，请联系管理员");
            this.result = "";
          });
      }
    },
    register() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
.bigBox {
  margin-top: -750px;
  z-index: 1;
}
.imgbg {
  width: 100%;
  height: 100%;
}

.loginDiv {
  text-align: center;
  margin-top: 80px;
}
.loginDiv input {
  margin-top: 20px;
}
.btnLogin {
  margin-left: 100px;
  margin-top: 10px;
}
.btnLogin button {
  margin-top: 20px;
}

input {
  width: 300px;
  height: 35px;
  border-radius: 5px;
}
.btn {
  width: 100px;
  height: 30px;
}
</style>
