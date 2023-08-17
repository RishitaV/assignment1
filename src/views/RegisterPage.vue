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

        <v-text-field
          v-model="contact"
          :rules="contactRules"
          label="Contact"
        ></v-text-field>

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

        <button @click.prevent="signUp(e)" type="submit" class="btn btn-primary btn-block">
          Sign Up
        </button>
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
      contact: "",
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
      contactRules: [
        (v) => !!v || "Contact is required",
        (v) =>
          /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(v) ||
          "Invalid contact number",
      ],
    };
  },
  methods: {
    async signUp() {
      let res = await axios.post("http://localhost:3000/users", {
        email: this.email,
        password: this.password,
        contact: this.contact,
        role: 'user'
      });
      setTimeout(() => {
        if (res.status <= 400) {
          console.log('gyhijoko;jykgfs');
          localStorage.setItem("user-info", JSON.stringify(res.data));
          this.$router.push({ name: "LoginPage" });
        }
        
      }, 2000);
    },
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