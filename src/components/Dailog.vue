<template>
  <div class="main_container" >
    <div class="container" v-for="issue in issues" :key="issue.id">
      <v-alert
        v-show="new Date(issue.dueDate).getDate() - new Date().getDate()  <= 3"
        class="dailog"
        type="error"
        >{{issue.bName}} to be returned on {{ issue.dueDate }}
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
        return issue.uName === this.user.email;
      });
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
.container {
  position: relative;
  top: 0;
  right: 0;
}
.main_container {
  position: absolute;
  z-index: 1;
  right: 0;
}
</style>