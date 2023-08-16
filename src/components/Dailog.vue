<template>
  <div>
    <div v-for="issue in issues" :key="issue.id">
      <v-alert
        v-show="new Date(issue.dueDate).getDate() - new Date().getDate()  <= 3"
        class="dailog"
        type="error"
        >Book to be returned on {{ issue.dueDate }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "alertDailog",
  data() {
    return {
      user: {},
      issues: [],
    };
  },
  methods: {
    async loadData() {
      let user = localStorage.getItem("user-info");
      let res = await axios.get("http://localhost:3000/issues");
      this.user = JSON.parse(user);
      this.issues = res.data.filter((issue) => {
        console.log(
          "sjw==> ", new Date(issue.dueDate).getDate() - new Date().getDate()  <= 3

        );
        return issue.uName === this.user.email;
      });
      console.log(this.issues);
    },
  },
  async mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.dailog {
  width: 50%;
}
</style>