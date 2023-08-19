<template>
  <div class="nav">
    <slot></slot>
    <div class="options" @click="logout()">Logout</div>
  </div>
</template>

<script>
export default {
  name: "HeaderComp",
  methods: {
    async logout() {
      localStorage.clear();
      this.$router.push({ name: "LoginPage" });
      try {
        await this.$store.dispatch("logout");
      } catch (error) {
        console.error(error);
      }
    },
  },
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
