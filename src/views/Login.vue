<template>
  <div>
    <div class="container-fluid login-page p-0">
      <div class="d-flex" style="height:100%">
        <div class="col-4 px-0 sidebar">
          <div class="sidebar-item">
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home"
                type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                <div class="link-container text-end me-5" style="color: 71afb6">登入</div>
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <p class="copyright-text">
              Copyright © 2022
            聚典資訊股份有限公司 All
              rights reserved.
            </p>
          </div>
        </div>

        <!-- loading -->
        <div class="loading-background-login" v-show="loading">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="col-8" style="margin-top: 100px">
          <div class="tab-content d-flex justify-content-center" id="v-pills-tabContent">
            <div class="show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"
              style="width: 70%">
              <div class="d-flex align-items-center">
                <h2 class="Welcome-text">歡迎進入</h2>
                &nbsp; &nbsp; &nbsp;
                <!-- <img src="../../src/assets/clickforce.png" style="height: 34px" /> -->
                <img src="../assets/img/smf_logo_t.png" style="height: 34px" />
              </div>
              <div>
                <p class="mt-2" style="color: #c4c4c4">請登入您的帳號</p>
              </div>

              <div class="form-group mt-5">
                <label for="exampleInputEmail1" class="input-title">帳號
                </label>
                <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="userName" style="background-color: #fff; border:0.1px solid #c4c4c4;"
                  required />
              </div>
              <div class="form-group mt-5">
                <label for="exampleInputPassword1" class="input-title">密碼</label>
                <input :type="passwordFieldType" class="form-control" id="exampleInputPassword1" placeholder=""  style="background-color: #fff; border:0.1px solid #c4c4c4;"
                  v-model="password" required ref="passwordInput" v-on:keyup.enter="login()" />

                <span toggle="#password-field" class="fa fa-fw fa-eye fa-2x field-icon toggle-password"
                  @click="showPassword">
                  <img src="../../src/assets/eye-password.png" v-show="!passwordEye" />
                  <img src="../../src/assets/eyeclose-password.png" v-show="passwordEye" />
                </span>
              </div>

              <!-- <router-link to="/ForgotPassword" style="text-decoration: none">
                <p class="mt-4" style="color: #c4c4c4">忘記密碼 ?</p>
              </router-link> -->
              <div class="mt-4"></div>
              <div class="d-flex submit-button">
                <div class="btn buttons p-0 mt-5 submit-button">
                  <button type="submit " @click="login()" class=" submit-button btn button-color " id="submit">
                    登入
                  </button>

                  <!-- <button type="submit" @click="logout()">Log out</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      userName: "",
      password: "",
      signupUser: "",
      signupPassword: "",
      passwordFieldType: "password",
      loading: false,
      passwordEye: false,
      href: "",
    };
  },
  created() {
    this.href = location.href;
    console.log("location.href", location.href);
  },

  methods: {
    login: async function () {
      this.loading = true;
      const body = {
        username: this.userName,
        password: this.password,
      };
      // if (body.username === 'test' && body.password != '') {
      //   sessionStorage.setItem("token", "ImLogin");
      //   sessionStorage.setItem("name", '瓶蓋工廠');
      //   sessionStorage.setItem("username", '瓶蓋工廠');
      //   sessionStorage.setItem("email", 'popop@gmail.com');
        
      // }
      await axios
        .post(
          'https://ssp.retailing-data.net/api/auth/login',
          body
        )
       .then((res) => {
          console.log("login", res);
          sessionStorage.setItem('token',res.data.access_token)
          sessionStorage.setItem('bearer',res.data.token_type)
          this.$router.push("/Overview");
          this.loading = false;
        })
        .catch((err) => {
          alert("登入失敗");
          console.log(err);
          this.loading = false;
        });

      // await allapi2
      //   .userSigninPost(null, body)
      //   .then((res) => {
      //     console.log(res);
      //     console.log(res.data);
      //     // this.$store.dispatch("LoggedInEd")

      //     sessionStorage.setItem("access_token", res.data.acces_token);
      //     sessionStorage.setItem("id_token", res.data.id_token);
      //     if (this.href.includes("clickforce")) {
      //       sessionStorage.setItem("was_clickforce", "clickforce");
      //     } else {
      //       sessionStorage.setItem("was_clickforce", "CDP");
      //     }

      //     this.loading = false;
      //     this.$router.push("/OperationalOverview");
      //   })
      //   .catch((err) => {
      //     console.log("連線有誤");
      //     console.log(err);
      //     alert("登入失敗");
      //     this.loading = false;
      //   });
    },
    showPassword() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
      this.passwordEye = !this.passwordEye;
    },
  },
};
</script>

<style scoped>
/* Login */
.login-page {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
  overflow: hidden;
  height: 100%;
}

/*own css */
.loading-background-login {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
  text-align: center;
  padding: 400px 0;
  height: 100%;
}

.sidebar {
  background-color: #eaf3f4;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
  position: relative;
  color: #71afb6;
  background-color: #fff;
  background-size: 100% auto;
  /* padding: 9px 16px; */
  /* padding: 20px 30vh 20px 30vh; */
}

.nav-link {
  color: #000;
  width: 100%;
  padding: 20px 16px;
}

.Welcome-text {
  font-size: 36px;
  color: #575757;
  
}

.button-color {
  /*background-color:#71AFB6;*/
  border: none;
  background-image: linear-gradient(to top left, #71afb6, #b5dce0);
  color: #fff;
  border-radius: 10px;
  width: 35rem;
  height: 45px;
}

.nav-link.active::before {
  position: absolute;
  content: "";
  top: -30px;
  right: 0;
  height: 65px;
  width: 36px;
  background-color: white;
}

.nav-link.active::after {
  position: absolute;
  content: "";
  right: 0;
  height: 50px;
  width: 36px;
  background-color: white;
}


.nav-link.active .link-container::before {
  position: absolute;
  content: "";
  top: 72px;
  right: 0px;
  height: 59px;
  width: 83px;
  border-radius: 50%;

  z-index: 9;
  background-color: #eaf3f4;
}

.nav-link.active .link-container::after {
  position: absolute;
  content: "";
  top: -59px;
  right: 0px;
  height: 59px;
  width: 83px;
  border-radius: 50%;
  background-color: #eaf3f4;
}

.sidebar-item {
  margin-top: 16rem;
}

.link-container {

  /* font-weight: 700; */
  font-size: 28px;
}

.input-title {
  
  font-size: 25px;
  color: #575757;
}

.form-control {
  margin-top: 1rem;
  border: none;
  /* filter: drop-shadow(0 0 0.5rem rgba(61, 60, 60, 0.152)); */
  line-height: 2;
  border-radius: 10px;
  width: 100%;
}

.field-icon {
  float: right;
  margin-left: -17px;
  margin-top: -34px;
  position: relative;
  z-index: 2;
  cursor: pointer;
  color: #c4c4c4;
}

.fa-fw {
  width: 3.2857142899999996em;
}

.copyright-text {
  font-size: 12px;
  position: absolute;
  bottom: 0;
}
.submit-button{
  font-size: 18px;
  width: 100%;
}

/* @media screen and (min-width: 1440px) and (max-width: 1550px) {
  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    width: 46rem;
    position: relative;
    color: #71afb6;
    background-color: #fff;
    background-size: 100% auto;
    padding: 20px 30vh 20px 30vh;
  }

  .nav-link.active .link-container::before {
  position: absolute;
    content: "";
    top: 70px;
    right: 121px;
    height: 110px;
    width: 176px;
    border-radius: 20%;
    z-index: 9;
    background-color: #eaf3f4;
  }

  .nav-link.active .link-container::after {
     position: absolute;
    top: -87px;
    content: "";
    height: 88px;
    right: 120px;
    width: 182px;
    border-radius: 20%;
    background-color: #eaf3f4;
  }
}

@media screen and (min-width: 1700px) and (max-width: 1880px) {
  .nav-pills .nav-link.active,
  .nav-pills .show > .nav-link {
    width: 46rem;
    position: relative;
    color: #71afb6;
    background-color: #fff;
    background-size: 100% auto;
    padding: 20px 30vh 20px 30vh;
  }

  .nav-link.active .link-container::before {
    position: absolute;
    content: "";
    top: 70px;
    right: 44px;
    height: 110px;
    width: 176px;
    border-radius: 20%;
    z-index: 9;
    background-color: #eaf3f4;
  }

  .nav-link.active .link-container::after {
    position: absolute;
    top: -87px;
    content: "";
    height: 88px;
    right: 46px;
    width: 182px;
    border-radius: 20%;
    background-color: #eaf3f4;
  }
} */
</style>
