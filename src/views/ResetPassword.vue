
<template>
  <div>
    <!-- 成功寄出 alert -->
    <div
      class="modal fade"
      id="alertModalSuccessSend"
      tabindex="-1"
      aria-labelledby="alertModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header alert-modal-header">
            <img
              src="../assets/arrow-white.svg"
              alt="arrow"
              class=""
              data-bs-dismiss="modal"
            />
          </div>
          <div class="modal-body alert-modal-body">信件已寄出(email大於1分鐘後寄送，請耐心等候）</div>
          <div class="modal-footer alert-modal-footer">
            <button
              type="button"
              class="btn btn-secondary modal-btn-close"
              data-bs-dismiss="modal"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- failed寄出 alert -->
    <div
      class="modal fade"
      id="alertModalFailedSend"
      tabindex="-1"
      aria-labelledby="alertModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header alert-modal-header">
            <img
              src="../assets/arrow-white.svg"
              alt="arrow"
              class=""
              data-bs-dismiss="modal"
            />
          </div>
          <div class="modal-body alert-modal-body">帳號或Email錯誤</div>
          <div class="modal-footer alert-modal-footer">
            <button
              type="button"
              class="btn btn-secondary modal-btn-close"
              data-bs-dismiss="modal"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid login-page p-0">
      <div class="d-flex" style="height: 100%">
       <div class="col-4 px-0 sidebar">
          <div class="sidebar-item">
            <div
              class="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                class="nav-link active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
              >
                <div class="link-container text-end me-5" style="color: 71afb6">
                  忘記密碼
                </div>
              </button>
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <p class="copyright-text">
              Copyright © 2022 聚典資訊股份有限公司 All rights reserved.
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
          <div
            class="tab-content d-flex justify-content-center"
            id="v-pills-tabContent"
          >
            <div
              class="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
              style="width: 70%"
            >
              <div class="d-flex">
                <h2 class="Welcome-text">
                  <img
                    src="../assets/back-arrow.png"
                    @click="$router.go(-1)"
                    style="cursor: pointer"
                    class="me-1"
                  />

                  重新設定密碼?
                </h2>
              </div>
              <div>
                <h4 class="mt-2" style="color: #c4c4c4;font-size:18px" >
                  您的新密碼必須與先前使用的密碼不同，密碼設定長度至少為8個字元的字串，須包含大小寫及數字。
                </h4>
              </div>

              <div class="form-group mt-5">
                <label for="exampleInputEmail1" class="input-title" style="font-size: 25px;"
                  >新密碼
                </label>
                <input
                  :type="passwordFieldType2"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  v-model="password1"
                  required
                  v-bind:class="{ 'is-invalid': password1Error }"
                   style="background-color: #fff; border:0.1px solid #c4c4c4;"
                />
                <div class="invalid-feedback">
                  {{ password1ErrMsg }}
                </div>
                <span
                  toggle="#password-field"
                  class="fa fa-fw fa-eye fa-2x field-icon toggle-password"
                  @click="showPassword2"
                >
                  <img
                    src="../../src/assets/eye-password.png"
                    v-show="!passwordEye2"
                  />
                  <img
                    src="../../src/assets/eyeclose-password.png"
                    v-show="passwordEye2"
                  />
                </span>
              </div>
              <div class="form-group mt-5">
                <label for="exampleInputPassword1" class="input-title" style="font-size: 25px;"
                  >確認新密碼</label
                >
                <input
                  :type="passwordFieldType"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder=""
                  v-model="password2"
                  required
                  ref="passwordInput"
                  v-bind:class="{ 'is-invalid': password2Error }"
                   style="background-color: #fff; border:0.1px solid #c4c4c4;"
                />
                <div class="invalid-feedback">
                  {{ password2ErrMsg }}
                </div>
                <span
                  toggle="#password-field"
                  class="fa fa-fw fa-eye fa-2x field-icon toggle-password"
                  @click="showPassword"
                >
                  <img
                    src="../../src/assets/eye-password.png"
                    v-show="!passwordEye"
                  />
                  <img
                    src="../../src/assets/eyeclose-password.png"
                    v-show="passwordEye"
                  />
                </span>
              </div>
              <div class="form-group mt-5">
                <label for="exampleInputPassword1" class="input-title" style="font-size: 25px;"
                  >專屬驗證碼</label
                >
                <input
                  class="form-control"
                  placeholder=""
                  v-model="code"
                  required
                  ref="passwordInput"
                   style="background-color: #fff; border:0.1px solid #c4c4c4;"
                />
                <span
                  toggle="#password-field"
                  class="fa fa-fw fa-eye fa-2x field-icon toggle-password"
                  @click="showPassword"
                ></span>
                <p class="mt-4">
                  沒有收到 Email嗎?
                  <span
                    style="text-decoration: none; color: #71afb6"
                    @click="resendPassword()"
                    >重新寄送 Email</span
                  >
                </p>
              </div>
              <!-- <button @click="buttonCount()">count testy</button> -->

              <div class="d-flex justify-content-center">
                <div class="btn buttons submit-button p-0">
                  <button
                    type="submit"
                    @click="resetPassword()"
                    class="btn button-color submit-button mt-3"
                  >
                    更改密碼並返回登入頁
                  </button>
                  <!-- <button type="submit" @click="logout()">Log out</button> -->
                </div>
              </div>
              <!-- <div class="ps-3 pt-4">
                 <span >沒有收到 Email嗎?</span><span style="color:#71AFB6"> 重新寄送 Email</span>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      password1: "",
      password1Error: false,
      password1ErrMsg: "",
      password2: "",
      password2Error: false,
      password2ErrMsg: "",
      code: "",
      signupUser: "",
      signupPassword: "",
      passwordFieldType: "password",
      passwordFieldType2: "password",
      loading: false,
      passwordEye: false,
      passwordEye2: false,
      localStoreEmail: "",
      localStoreUsername: "",
      clickCount:0,
    };
  },

  watch: {
    password1: function () {
      var lowerCaseLetters = /[a-z]/g;
      var upperCaseLetters = /[A-Z]/g;
      var numberLetters = /(?=.*[0-9])/;

      if (!lowerCaseLetters.test(this.password1)) {
        this.password1Error = true;
        this.password1ErrMsg = "請加入小寫英文之母";
      } else if (!upperCaseLetters.test(this.password1)) {
        this.password1Error = true;
        this.password1ErrMsg = "請加入大寫英文之母";
      } else if (!numberLetters.test(this.password1)) {
        this.password1Error = true;
        this.password1ErrMsg = "請加入數字";
      } else if (this.password1.length < 8) {
        this.password1Error = true;
        this.password1ErrMsg = "請勿少於8個字";
      } else {
        this.password1Error = false;
      }
    },
    password2: function () {
      var lowerCaseLetters = /[a-z]/g;
      var upperCaseLetters = /[A-Z]/g;
      var numberLetters = /(?=.*[0-9])/;

      if (!lowerCaseLetters.test(this.password2)) {
        this.password2Error = true;
        this.password2ErrMsg = "請加入小寫英文之母";
      } else if (!upperCaseLetters.test(this.password2)) {
        this.password2Error = true;
        this.password2ErrMsg = "請加入大寫英文之母";
      } else if (!numberLetters.test(this.password2)) {
        this.password2Error = true;
        this.password2ErrMsg = "請加入數字";
      } else if (this.password2.length < 8) {
        this.password2Error = true;
        this.password2ErrMsg = "請勿少於8個字";
      } else {
        this.password2Error = false;
      }
    },
  },

  methods: {
    resetPassword() {
      //  this.clickCount = this.clickCount + 1;
      this.loading = true;
      const emailForResetPassword = localStorage.getItem(
        "emailForResetPassword"
      );

      if (this.password1 != this.password2) {
        alert("新密碼與確認密碼不同");
        this.loading = false;
      } else if (this.password1Error) {
        alert(this.password1ErrMsg);
        this.loading = false;
      } else if (this.password2Error) {
        alert(this.password2ErrMsg);
        this.loading = false;
      } 
   
      else {
        const body = {
          username: emailForResetPassword,
          password: this.password2,
          code: this.code,
        };
      }
    },
    buttonCount(){
      this.clickCount = this.clickCount + 1
      console.log('count', this.clickCount)
    },

    resendPassword() {
      this.clickCount = this.clickCount + 1
      console.log('count', this.clickCount)
      this.localStoreEmail = localStorage.getItem("emailForResetPassword");
      this.localStoreUsername = localStorage.getItem("userForResetPassword");
      if(this.clickCount > 2){
      alert("你點太多次咯");
      }else{
      const body = {
        username: this.localStoreUsername,
        email: this.localStoreEmail,
      };
      }
    },

    showPassword() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
      this.passwordEye = !this.passwordEye;
    },
    showPassword2() {
      this.passwordFieldType2 =
        this.passwordFieldType2 === "password" ? "text" : "password";
      this.passwordEye2 = !this.passwordEye2;
    },
  },
};
</script>

<style scoped>
.form-group {
  position: relative;
}

.form-control.is-invalid,
.was-validated .form-control:invalid {
  border-color: #dc3545;
  padding-right: 0;
  background-image: none;
  background-repeat: no-repeat;
  background-position: 0;
  background-size: 0;
}
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
  height: 100%;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  position: relative;
  color: #71afb6;
  background-color: #fff;
  background-size: 100% auto;
  padding: 20px 16px;
}
.nav-link {
  color: #000;
}
.Welcome-text {
  font-size: 36px;
  color: #575757;
}
.button-color {
  /*background-color:#71AFB6;*/
  border: none;
  width: 500px;
  height: 50px;
  background-image: linear-gradient(to top left, #71afb6, #b5dce0);
  color: #fff;
  border-radius: 10px;
}
.nav-link.active::before {
  position: absolute;
  content: "";
  top: -30px;
  right: 0;
  height: 65px;
  width: 40px;
  background-color: white;
}

.nav-link.active::after {
  position: absolute;
  content: "";
  right: 0;
  height: 52px;
  width: 40px;
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
.active .link-container::after {
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
.form-control {
  margin-top: 1rem;
  border: none;
  line-height: 2;
  border-radius: 10px;
  width: 100%;
}
.field-icon {
    float: right;
    margin-left: -17px;
    margin-top: -40px;
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

.link-container {

  /* font-weight: 700; */
  font-size: 28px;
}
.submit-button{
  font-size: 18px;
  width: 100%;
}
</style>
