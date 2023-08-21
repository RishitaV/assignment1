<template>
  <div>
    <v-autocomplete
      v-model="bookToBeIssued"
      label="Select Book"
      :items="bookList"
    ></v-autocomplete>

    <v-btn @click="issueBook()" class="ma-2" color="primary"> Issue </v-btn>
    rgte{{ bookToBeIssued }}
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
      user: {},
      books: [],
      bookList: [],
    };
  },
  methods: {
    async issueBook() {
      let dt = new Date();
      let today = new Date();
      dt.setDate(dt.getDate() + 10);
      let selectedBook = this.book.filter(
        (book) => book.title === this.bookToBeIssued
      );
      await axios.post("http://localhost:3000/issues", {
        bid: selectedBook[0].id,
        uid: this.user.id,
        uName: this.user.email,
        uContact: this.user.contact,
        bName: selectedBook[0].title,
        dueDate: dt.toLocaleDateString(),
        issueDate: today.toLocaleDateString(),
      });
      await axios.put(`http://localhost:3000/books/${selectedBook[0].id}`, {
        ...selectedBook[0],
        available: selectedBook[0].available - 1,
      });
      this.$router.push({ name: "AdminPage" });
    },
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!this.$store.state.isAuthenticated) {
      this.$router.push({ name: "LoginPage" });
    } else {
      this.user = JSON.parse(user);
    }

    let resB = await axios.get("http://localhost:3000/books");
    this.book = resB.data;
    this.bookList = resB.data.map((item) => {
      if (item.available) {
        return item.title;
      }
    });
    let resU = await axios.get("http://localhost:3000/users");
    this.users = resU.data.map((item) => item.email);
  },
};
</script>