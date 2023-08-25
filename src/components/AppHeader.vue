<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="toggleSidebar" />
    <v-toolbar-title>My library</v-toolbar-title>
    <v-toolbar-title class="logout" @click="logout()">Logout</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  computed: {
    showHeader() {
      let paths = ["/login", "/register"];
      return !paths.includes(this.$route.path);
    },
  },
  methods: {
    async logout() {
      try {
        localStorage.clear();
        await this.$store.dispatch("logout");
        this.$router.push({ name: "LoginPage" });
      } catch (error) {
        console.error(error);
      }
    },
    toggleSidebar() {
      this.$emit("toggle-sidebar");
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
.logout {
  cursor: pointer;
  margin-left: auto;
}
</style>
