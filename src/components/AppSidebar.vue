<template>
  <v-navigation-drawer app v-if="sidebarOpen">
    <div class="user__profile">
      <div>
        <v-avatar color="secondary" size="40">
          <span class="white--text">{{ userName }}</span>
        </v-avatar>
      </div>
      <div class="user__email">
        {{ userEmail }}
      </div>
    </div>
    <v-divider class="divider"></v-divider>
    <v-list>
      <router-link
        class="router__link"
        v-for="item in navigationItems"
        :key="item.title"
        :to="item.to"
        link
      >
        <v-list-item v-show="showLink(item)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppSidebar",
  data() {
    return {
      navigationItems: [
        {
          title: "Home",
          icon: "mdi-home",
          to: "/home",
          roles: ["user", "admin"],
        },
        {
          title: "All books",
          icon: "mdi-book-multiple",
          to: "/",
          roles: ["user", "admin"],
        },
        {
          title: "Add Books",
          icon: "mdi-book-plus",
          to: "/add",
          roles: ["admin"],
        },
        {
          title: "Issue Books",
          icon: "mdi-book-check",
          to: "/issueBook",
          roles: ["user"],
        },
        {
          title: "Customer Details",
          icon: "mdi-information",
          to: "/custDetails",
          roles: ["admin"],
        },
        {
          title: "My issued books",
          icon: "mdi-book-multiple",
          to: "/custDetails",
          roles: ["user"],
        },
      ],
    };
  },
  props: {
    sidebarOpen: Boolean,
  },
  async mounted() {
    let user = JSON.parse(localStorage.getItem("user-info"));
    if (user) {
      try {
        await this.$store.dispatch("login", user);
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    showHeader() {
      let paths = ["/login", "/register"];
      return !paths.includes(this.$route.path);
    },
    user() {
      return this.$store.state.user;
    },
    userName() {
      const userEmail = this.user.email;
      return userEmail
        ? userEmail.charAt(0).toUpperCase()
        : "";
    },
    userEmail() {
      return this.user.email || "";
    },
  },
  methods: {
    showLink(navigationItem) {
      if (navigationItem.roles) {
        return navigationItem.roles.includes(this.user.role);
      }
    },
  },
};
</script>

<style scoped>
.router__link {
  text-decoration: none;
}
.user__email {
  font-size: 0.7rem;
}
.user__profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.divider {
  margin-top: 3%;
}
</style>