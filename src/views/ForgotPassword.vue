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
          <div class="modal-body alert-modal-body">
            信件已寄出(email大於1分鐘後寄送，請耐心等候）
          </div>
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
              @click="goResetPassword()"
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
                  忘記密碼?
                </h2>
              </div>
              <div>
                <h4 class="mt-2" style="color: #c4c4c4;font-size:18px">
                  請輸入您的帳號及Email，我們將會寄送重新設定密碼的信件到您的信箱中。
                </h4>
              </div>

              <div class="form-group mt-5">
                <label for="exampleInputEmail1" class="input-title" style="font-size: 25px;"
                  >帳號
                </label>
                <input
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  v-model="userName"
                  required
                  style="background-color: #fff; border: 0.1px solid #c4c4c4"
                />
              </div>
              <div class="form-group mt-5">
                <label for="exampleInputPassword1" class="input-title"  style="font-size: 25px;"
                  >EMAIL</label
                >
                <input
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder=""
                  v-model="password"
                  required
                  ref="passwordInput"
                  style="background-color: #fff; border: 0.1px solid #c4c4c4"
                />
              </div>

              <div class="d-flex justify-content-center">
                <div class="btn buttons submit-button p-0 mt-5">
                  <button
                    type="submit"
                    @click="sendEmail()"
                    class="btn button-color submit-button mt-5"
                  >
                    寄送
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
    };
  },

  methods: {
    sendEmail() {
      this.loading = true;
      const body = {
        username: this.userName,
        email: this.password,
      };
    },
    goResetPassword() {
      this.$router.push("/ResetPassword");
    },
  },
};
</script>

<style scoped>
/* ForgotPassword */
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
  width: 35rem;
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
  /* filter: drop-shadow(0 0 0.5rem rgba(61, 60, 60, 0.152)); */
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
  font-size: 16px;
  position: absolute;
  bottom: 0;
}
.link-container {
  /* font-weight: 700; */
  font-size: 28px;
}
.submit-button {
  font-size: 18px;
  width: 100%;
}
.copyright-text {
  font-size: 12px;
  position: absolute;
  bottom: 0;
}
</style>
