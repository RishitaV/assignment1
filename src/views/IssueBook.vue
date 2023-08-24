<template>
  <div>
    <v-autocomplete
      v-model="bookToBeIssued"
      label="Select Book"
      :items="bookList"
    ></v-autocomplete>

    <v-btn @click="issueBook()" class="ma-2" color="primary"> Issue </v-btn>
  </div>
</template>

<script>
export default {
  name: "IssueBook",
  data() {
    return {
      bookToBeIssued: "",
      user: {},
      books: [],
      bookList: [],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    allBooks() {
      return this.$store.state.books;
    },
  },
  methods: {
    async issueBook() {
      let bookDueDate = new Date();
      let today = new Date();
      bookDueDate.setDate(bookDueDate.getDate() + 10);
      let selectedBook = this.allBooks.filter(
        (book) => book.title === this.bookToBeIssued
      );
      await this.$store.dispatch("addToIssues", {
        bookId: selectedBook[0].id,
        userId: this.user.id,
        userName: this.user.email,
        userContact: this.user.contact,
        bookName: selectedBook[0].title,
        bookDueDate: bookDueDate.toLocaleDateString(),
        bookIssueDate: today.toLocaleDateString(),
      });
      await this.$store.dispatch("updateBookAvailability", {
        ...selectedBook[0],
        available: selectedBook[0].available - 1,
      });
      this.$router.push({ name: "AdminPage" });
    },
  },
  async mounted() {
    if (!this.isAuthenticated) {
      this.$router.push({ name: "LoginPage" });
    } else {
      this.user = this.$store.getters.user;
    }
    await this.$store.dispatch("setBooks");
    let books = this.allBooks;
    if (books) {
      this.bookList = books.map((item) => {
        if (item.available) {
          return item.title;
        }
      });
    }
    let users = await this.$store.getters.users;
    if (users) {
      this.users = users.map((item) => item.email);
    }
  },
};
</script>