<template>
  <div>
    <v-autocomplete label="Select Book" :items="books"></v-autocomplete>

    <v-autocomplete label="Select User" :items="users"></v-autocomplete>

    <v-btn @click="issueBook(e)" class="ma-2" color="primary"> Issue </v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "IssueBook",
  data() {
    return {
      bookToBeIssued: "",
      issuedTo: "",
      users: [],
      books: [],
    };
  },
  methods: {
    async issueBook() {
    //   let dt = new Date();
    //   let today = new Date();
    //   dt.setDate(dt.getDate() + 10);
    //   let res = await axios.post("http://localhost:3000/issues", {
    //     bid: id,
    //     uid: this.user.id,
    //     uName: this.user.email,
    //     bName,
    //     dueDate: dt.toLocaleDateString(),
    //     issueDate: today.toLocaleDateString(),
    //   });
    },
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "LoginPage" });
    }

    let resB = await axios.get("http://localhost:3000/books");
    this.books = resB.data.map((item) => item.title);
    let resU = await axios.get("http://localhost:3000/users");
    this.users = resU.data.map((item) => item.email);
  },
};
</script>