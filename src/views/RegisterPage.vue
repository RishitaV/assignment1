<template>
  <div>
    <h3>Register</h3>
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

        <div>
          <v-text-field
            v-model="confirmPassword"
            :rules="passwordRules"
            label="Confirm Password"
          ></v-text-field>
        </div>

        <button @click="signUp" type="submit" class="btn btn-primary btn-block">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  props: {},
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
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
    }
  },
  methods: {
    async signUp() {
      let res = await axios.post("http://localhost:3000/users", {
        email: this.email,
        password: this.password,
      });
      if (res.status === 201) {
        localStorage.setItem("user-info", JSON.stringify(res.data));
        this.$router.push({name: 'AdminPage'})
      }
    },
  }
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