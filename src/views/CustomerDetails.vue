<template>
  <div>
    <h3>Customer Details</h3>
    <v-btn class="ma-2" @click="toggleActive" color="primary"> AG-Grid </v-btn>
    <div v-show="active">
      <v-simple-table class="table">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Book Name</th>
              <th class="text-left">Issuer</th>
              <th class="text-left">Issue Date</th>
              <th class="text-left">Due Date</th>
              <th class="text-left">Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="issue in bookIssues" :key="issue.id">
              <td>
                {{ issue.bookName }}
              </td>
              <td>{{ issue.userName }}</td>
              <td>{{ issue.bookIssueDate }}</td>

              <td>{{ issue.bookDueDate }}</td>
              <td>{{ issue.userContact }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div v-show="!active">
      <AGgrid v-if="bookIssues.length" :books="bookIssues" />
    </div>
  </div>
</template>
<script>
import AGgrid from "./AGgrid";
export default {
  name: "CustomerDetails",
  data() {
    return {
      bookIssues: [],
      active: true,
    };
  },
  components: {
    AGgrid,
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    toggleActive() {
      this.active = !this.active;
    },
  },
  async mounted() {
    let user = this.$store.getters.user || {};
    if (!this.isAuthenticated) {
      this.$router.push({ name: "LoginPage" });
    }
    const res = this.$store.getters.issues;
    this.bookIssues =
      user.role === "user"
        ? res.filter((issueer) => issueer.userName === user.email)
        : res;
  },
};
</script>

<style scoped>
table {
  height: 90vh;
}
</style>