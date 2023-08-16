<template>
  <div>
    <h3>Customer Details</h3>
    <v-simple-table class="table" height="90vh">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Book Name</th>
            <th class="text-left">User Name</th>
            <th class="text-left">Due Date</th>
            <th class="text-left">Issue Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="issue in bookIssues" :key="issue.id">
            <td>
              {{ issue.bName }}
            </td>
            <!-- <td>{{ book.title }}</td> -->
            <td>{{ issue.uName }}</td>
            <td>{{ issue.issueDate }}</td>

            <td>{{ issue.dueDate }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "CustomerDetails",
  data() {
    return {
      bookIssues: [],
    };
  },
  async mounted() {
    this.user = localStorage.getItem("user-info");
    if (!this.user) {
      this.$router.push({ name: "LoginPage" });
    }
    let res = await axios.get("http://localhost:3000/issues");
    this.bookIssues = res.data;
  },
};
</script>