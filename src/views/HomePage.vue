<template>
  <div>
    <router-link to="/admin"><v-btn class="ma-2" color="primary"> Home </v-btn></router-link>
    <router-link to="/add"><v-btn class="ma-2" color="primary"> Add Books </v-btn></router-link>
    <router-link to="/issueBook"><v-btn class="ma-2" color="primary"> Issue Books </v-btn></router-link>
    <router-link to="/custDetails"><v-btn class="ma-2" color="primary"> Customer Details </v-btn></router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      user: {},
    }
  },
  mounted(){
      this.user = localStorage.getItem("user-info");
      if (!this.user) {
        this.$router.push({ name: "LoginPage" });
      }
  }
}
</script>