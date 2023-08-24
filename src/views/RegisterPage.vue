<template>
  <div>
    <h3>Register</h3>
    <div class="container py-5 main-container">
      <v-form>
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

        <v-select
          label="Select"
          v-model="role"
          :items="['Admin', 'User']"
        ></v-select>

        <button
          @click.prevent="signUp(e)"
          type="submit"
          class="btn btn-primary btn-block"
        >
          Sign Up
        </button>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  props: {},
  data() {
    return {
      email: "",
      contact: "",
      password: "",
      confirmPassword: "",
      role: "",
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
      this.$store.dispatch("registerUser", {
        email: this.email,
        password: this.password,
        contact: this.contact,
        role: this.role,
      });
      this.$router.push({ name: "LoginPage" });
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