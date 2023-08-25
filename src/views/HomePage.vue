<template>
  <div>
    <router-link to="/" v-if="showAddBook()">
      <v-btn class="ma-2" color="primary"> All Books </v-btn>
    </router-link>
    <router-link to="/add" v-if="showAddBook()">
      <v-btn class="ma-2" color="primary"> Add Books </v-btn>
    </router-link>
    <router-link to="/issueBook" v-if="!showAddBook()">
      <v-btn class="ma-2" color="primary"> Issue Books </v-btn>
    </router-link>
    <router-link to="/custDetails">
      <v-btn class="ma-2" color="primary"> Customer Details </v-btn>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    showAddBook() {
      return this.$store.getters.user.role === "admin";
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.push({ name: "LoginPage" });
    }
  },
};
</script>