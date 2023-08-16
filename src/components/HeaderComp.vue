<template>
  <div class="nav">
    <slot></slot>
    <!-- <div class="options">Logo</div> -->
    <div class="options" @click="logout()">Logout</div>
  </div>
</template>

<script>
export default {
  name: "HeaderComp",
  methods: {
    logout() {
        localStorage.clear();
        this.$router.push({name: 'LoginPage'});
    }
  }
};
</script>

<style scoped>
.nav {
  background-color: #333;
  display: flex;
  justify-content: space-between;
  color: white;
}
.options {
    cursor: pointer;
}
</style>
