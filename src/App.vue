<template>
  <div id="nav" class="d-flex flex-column">
    <Header class="col-12" />
    <div class="col-12 d-flex flex-fill">
      <LeftNav id="leftNav" class="col-2" />
      <div class="col-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  created() {
    this.test();
  },
  methods: {
    test() {
      console.log(window.localStorage);
    },
  },
};
</script>

<style scoped>
#nav {
  height: 100vh;
}
#nav ::-webkit-scrollbar {
  width: 10px;
}

#nav ::-webkit-scrollbar-track {
  background: #eeeeee;
  border-radius: 10px;
}

#nav ::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  border-radius: 10px;
}

/* Handle on hover */
#nav ::-webkit-scrollbar-thumb:hover {
  background: rgb(126, 125, 125);
}
</style>
