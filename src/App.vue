<template>
  <v-app>

    <v-main>
      <app-header v-if="showHeader" @toggle-sidebar="toggleSidebar" />
      <app-sidebar v-if="showSidebar" :sidebarOpen="sidebarOpen" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppSidebar from "./components/AppSidebar.vue";
import AppHeader from "./components/AppHeader.vue";

export default {
  components: { AppSidebar, AppHeader },
  name: "App",
  data() {
    return {
      sidebarOpen: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
  computed: {
    showHeader() {
      let paths = ["/login", "/register"];
      return !paths.includes(this.$route.path);
    },
    showSidebar() {
      let paths = ["/login", "/register"];
      return !paths.includes(this.$route.path);
    },
  },
};
</script>
