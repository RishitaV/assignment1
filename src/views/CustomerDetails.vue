<template>
  <div>
    <h3>Customer Details</h3>
    <v-btn class="ma-2" @click="toggleActive" color="primary"> AG-Grid </v-btn>
    <div v-show="active">
      <v-simple-table class="table" height="90vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Book Name</th>
              <th class="text-left">Issuer</th>
              <th class="text-left">Due Date</th>
              <th class="text-left">Issue Date</th>
              <th class="text-left">Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="issue in bookIssues" :key="issue.id">
              <td>
                {{ issue.bName }}
              </td>
              <td>{{ issue.uName }}</td>
              <td>{{ issue.issueDate }}</td>

              <td>{{ issue.dueDate }}</td>
              <td>{{ issue.uContact }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div v-show="!active">
      <AGgrid v-if="bookIssues.length" :books = "bookIssues" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AGgrid from './AGgrid';
export default {
  name: "CustomerDetails",
  data() {
    return {
      bookIssues: [],
      user: {},
      active: true,
    };
  },
  components: {
    AGgrid,
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
    },
  },
  async mounted() {
    this.user = JSON.parse(localStorage.getItem("user-info")) || {};
    if (!this.$store.state.isAuthenticated) {
      this.$router.push({ name: "LoginPage" });
    }
    const res = await axios.get("http://localhost:3000/issues");
    this.bookIssues =
      this.user.role === "user"
        ? res.data.filter((issueer) => issueer.uName === this.user.email)
        : res.data;
  },
};
</script>