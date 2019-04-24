<template>
  <div>
    <img src="../assets/13.jpg" alt="图片" class="imgbg">
    <div class="bigBox">
      <h1>深圳市航天泰瑞捷电子有限公司</h1>

      <div class="loginDiv">
        <div>
          <input type="text" name="userID" id v-model="userID" placeholder="请输入工号">
        </div>
        <div class="passBtn">
          <input type="password" name="userPwd" id v-model="userPwd" placeholder="请输入密码">
        </div>
        <div class="btnLogin">
          <button @click="login()" class="btn">登录</button>
          <button @click="register()" class="btn">注册</button>
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
      userPwd: "",
      result: ""
    };
  },
  methods: {
    login() {
      if (this.userPwd === "" || this.userID === "") {
        window.alert("每一项都要填哦");
      } else {
        this.result = "正在登录...请稍等...";
        let params = { userID: this.userID };
        this.$axios({
          method: "GET",
          url: "https://172.0.0.116/login",
          params: params,
          type: "json"
        })
          .then(response => {
            this.result = "";
            console.log(response);
            // console.log(this.userPwd);
            // console.log(response.data.recordsets[0][0].userPwd);
            // console.log(response.data.recordsets[0][0].userPwd.length);
            // console.log(this.userPwd.length);
            console.log(
              encodeURIComponent(response.data.recordsets[0][0].userPwd)
            );
            // console.log(encodeURIComponent(this.userPwd));
            console.log(response.data.recordsets[0][0].userPwd.trim());
            console.log(response.data.recordsets[0][0].userPwd);
            console.log(decryptBy("WAq78uXhcGY="));

            if (response.statusText === "OK") {
              if (
                response.data.recordsets[0][0].userPwd.trim() === this.userPwd
              ) {
                window.alert("登录成功");
              } else {
                window.alert("密码错误");
                this.result = "";
              }
            } else {
              window.log("未连接成功，请重试");
              this.result = "";
            }
          })
          .catch(err => {
            console.log(err);
            window.alert("工号未注册，请先注册");
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
.passBtn {
  margin-top: 10px;
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
