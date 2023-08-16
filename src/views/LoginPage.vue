<template>
  <div>
    <h3>Login</h3>
    <div class="container py-5 main-container">
      <form>
        <div>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email address"
          ></v-text-field>
        </div>

        <div>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
          ></v-text-field>
        </div>
        <div class="row">
          <div class="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <v-btn @click="login" class="ma-2" color="primary"> Sign In </v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginPage",
  props: {},
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
          "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
      ],
    };
  },
  methods: {
    async login() {
      let res = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}`
      );
      if (res.status === 200 && res.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(res.data[0]));
        this.$router.push({ name: "HomePage" });
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "HomePage" });
    }
  },
};
</script>

<style scoped>
form {
  width: 50%;
}
.main-container {
  display: flex;
  justify-content: center;
}
</style>