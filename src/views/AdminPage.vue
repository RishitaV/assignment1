<template>
  <div>
    <div class="container">
      <v-simple-table class="table">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Available</th>
              <th v-show="isAdmin" class="text-left">Actions</th>
              <th class="text-left">
                <router-link to="/add">
                  <v-btn v-show="isAdmin" color="primary"> Add New Book </v-btn>
                </router-link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              :title="title(book.available)"
              :class="rowStyle(book.available)"
              v-for="book in getBooks"
              :key="book.id"
              @click="redirectToIssuePage(book.available)"
            >
              <td>
                <v-img
                  :src="book.image_url"
                  class="align-end book__image"
                  cover
                />
                {{ book.title }}
              </td>
              <td>{{ book.available }}</td>
              <td>
                <v-btn
                  v-show="isAdmin"
                  @click="deleteBook(book.id)"
                  color="primary"
                  >Delete Book
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <DueBooksAlertDailog />
  </div>
</template>

<script>
import DueBooksAlertDailog from "../components/DueBooksAlertDailog";

export default {
  name: "AdminPage",
  components: {
    DueBooksAlertDailog,
  },
  computed: {
    loginUser() {
      return this.$store.state.user;
    },
    getBooks() {
      return this.$store.state.books;
    },
    isAdmin() {
      return this.loginUser.role === "admin";
    },
  },
  methods: {
    async deleteBook(id) {
      await this.$store.dispatch("deleteBook", id);
      await this.$store.dispatch("setBooks");
    },
    redirectToIssuePage(bookIsAvailable) {
      if (this.loginUser.role !== "admin" && bookIsAvailable) {
        this.$router.push("/issueBook");
      }
    },
    async notLoggedIn() {
      if (!this.$store.state.isAuthenticated) {
        this.$router.push({ name: "LoginPage" });
      }
    },
    title(bookIsAvailable) {
      return bookIsAvailable ? "" : "Out of stock";
    },
    rowStyle(bookIsAvailable) {
      return bookIsAvailable ? "" : "disabled";
    },
  },
  async mounted() {
    await this.notLoggedIn();
  },
  created() {
    this.$store.dispatch("setBooks");
  },
};
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
}
.table {
  width: 80vw;
  height: 90vh;
}
.disabled {
  background-color: darkgrey;
}
.disabled:hover {
  background-color: pink;
}
.container {
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  align-items: flex-start;
  position: absolute;
}
.book__image {
  height: 100px;
  width: 80px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.5)
  );
}
</style>
