<template>
  <div class="leftNav" v-if="!this.login">
    <ul class="list-unstyled components">
      <li style="margin-bottom: 25px">
        <div
          :class="behavior ? 'highlight' : 'nohighlight'"
          class="ps-3"
          @click="this.behavior = !this.behavior"
        >
          <img src="../assets/effectGray.svg" v-show="!behavior" />
          <img src="../assets/effect.svg" v-show="behavior" />
          <span class="ms-6rem-custom"> 數據資料 </span>
          <img src="../assets/rightArrow.png" v-show="!behavior" />
          <img src="../assets/downArrow.png" v-show="behavior" />
        </div>
        <div class="ms-3" :class="behavior ? 'show' : 'noshow'">
          <router-link to="/Overview" active-class="active">
            即時資料
          </router-link>
          <router-link to="/Historical" active-class="active">
            歷史資料
          </router-link>
        </div>
      </li>
      
      <li style="margin-top: 8rem">
        <!-- <img  class="logo-power" src="../assets/leftnav-new.png" alt="logo"  />    -->

        <div class="power-logo">
          <img
            class="logo-width"
            src="../assets/leftnav-created.png"
            alt="logo"
          />
        </div>
      </li>
    </ul>
    <div class="power-logo"></div>
  </div>
</template>

<script>
export default {
  name: "LeftNav",
  data() {
    return {
      login: false,

      behavior: false,

      highlight: false,
      highlightPerformanceSMS:false,
      highlightPerformanceEmail:false,
      highlightEmail: false,
      highlightSms: false,
      sms: false,

      memberLimit:false
    };
  },
  watch: {
    $route: function () {
      this.login = this.$route.path === "/Login"
        // || this.$route.path === "/ForgotPassword" ||
        // this.$route.path === "/ResetPassword";

      this.behavior =
        this.$route.path === "/Overview" ||
        this.$route.path === "/Historical";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ms-6rem-custom {
  margin-left: 0.6rem;
}
.ms-025rem-custom {
  margin-left: 0.15rem;
}
li {
  cursor: pointer;
}

img {
  position: relative;
  top: -2px;
}
.leftNav {
  position: relative;
  background-color: #eaf3f4;
  min-width: 215px;
  min-height: calc(89vh);
  padding-top: 30px;
}
.highlight {
  vertical-align: bottom;
  font-size: 18px;
  color: #63a7c8;
}
.nohighlight {
  vertical-align: bottom;
  font-size: 18px;
  color: #8a8a8a;
}
.inside-highlight {
  /* background-color: #63a7c8; */
  color: #63a7c8;
  border-radius: 8px;
  font-size: 18px;
  padding-left: 35px;
  height: 40px;
  line-height: 40px;
}
.inside-nohighlight {
  color: #8a8a8a;
  font-size: 18px;
}
.show {
  display: block;
}
.noshow {
  display: none;
}
a {
  display: block;
  color: #8a8a8a;
  text-decoration: none;
  border-radius: 8px;
  margin: 10px;
  height: 40px;
  line-height: 40px;
  padding-left: 35px;
}
.active {
  display: block;
  background-color: #63a7c8;
  color: white;
}
.inside-active {
  color: #71afb6;
}
.power-logo {
  /* vertical-align: bottom; */
  position: absolute;
  bottom: 10px;
  /* padding-top: 20rem; */
  /* width: 14rem; */
  margin-left: 1.5rem;
  /* margin-bottom: 1rem; */
}

.logo-power {
  position: inherit;
  margin-top: 20rem;
  margin-left: 1.5rem;
  /* bottom: -10; */
}
.logo-width {
  width: 100%;
}
.overflow-text {
  white-space: nowrap;
  /* text-overflow:inherit; */
}
</style>
