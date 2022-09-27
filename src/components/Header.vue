<template>
  <div class="header-nav d-flex justify-content-between align-items-center">
    <div style="margin-left: 2.2%">
      <router-link
        class="d-flex align-items-center"
        to="/Overview"
        style="text-decoration: none"
      >
        <img
          class="clickforce-logo"
          src="../../src/assets/img/smf_logo_i.png"
        />
       
 
     
      </router-link>
      <!-- &emsp; &emsp; &emsp;  <img src="../../src/assets/CDPlogo.png" class="cdp-logo"   /> -->
    </div>
    <div
      style="margin-right: 20px; width: 100px"
      class="justify-content-between d-flex align-items-center"
    >
      <div class="dropdown">
        <button
          class="btn btn-link dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            class="head-img"
            src="../../src/assets/account.png"
            style="height: 35px"
          />

        </button>

        <ul
          id="profile-dropdown"
          class="dropdown-menu"
          aria-labelledby="dropdownMenuButton1"
        >
          <li class="user-div">
            <p class="username m-0">{{ signupUser ? signupUser : userNameLogo }}</p>
            <p class="user-email mb-1">{{ signupEmail ? signupEmail : '' }}</p>
          </li>

          <li>
            <a
              class="dropdown-item"
              href="https://retailingdata.com.tw/index.html#/ContactUs"
              target="_blank"
            >
              <img src="../../src/assets/phone-icon.svg" alt="profile" />
              聯絡我們</a
            >
          </li>
          <hr
            class="m-0 my-1"
            style="
              width: 100%;
              opacity: 1;
              height: 0;
              border: 0;
              border-bottom: 1px solid #c4c4c4;
            "
          />
          <li>
            <a class="dropdown-item last-item" @click="logout">
              <img src="../../src/assets/logout-icon.svg" alt="profile" />
              登出</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  data() {
    return {
      login: false,
      signupUser: "",
      signupEmail: "",
      accountNormal: true,
      accountHover: false,
      userNameLogo:'',
    };
  },
  created() {},
  watch: {
    $route: function () {
      this.login = this.$route.path === "/Login";
      if (!this.login) {
        this.signupUser = sessionStorage.getItem("name");
        this.signupEmail = sessionStorage.getItem("email");
        this.userNameLogo = sessionStorage.getItem('username')
      }
    },
  },
  methods: {
    hoverOn() {
      (this.accountNormal = false), (this.accountHover = true);
    },
    hoverLeave() {
      (this.accountNormal = true), (this.accountHover = false);
    },

    logout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("id_token");

      if (sessionStorage.getItem("was_clickforce") === "clickforce") {
        this.$router.push("/Login#clickforce");
      } else {
        this.$router.push("/Login");
      }
    },
  },
};
</script>

<style scoped>
.head-img:hover {
  opacity: 0.7;
}

.header-nav {
  height: 100px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 7px 0px;
  /* z-index: ; */
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-menu {
  border-radius: 20px;
}

.dropdown-menu a {
  color: #575757;
}

.dropdown-menu a:hover {
  background-color: #eaf3f4;
  color: #575757;
}

.dropdown-menu img {
  margin-right: 10px;
}

hr {
  margin: 5px;
}

.cdp-logo {
  width: 9rem;
}

.username {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
}

.user-email {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;

  color: #c4c4c4;
}

.user-div {
  padding-top: 0.5rem;
  padding-left: 1.2rem;
  padding-bottom: 0.2rem;
  box-shadow: rgba(174, 174, 174, 0.35) 0px 3px 4px -1px;
  margin-bottom: 5px;
  /* box-shadow: 0 4px 2px -2px gray; */
}
</style>
