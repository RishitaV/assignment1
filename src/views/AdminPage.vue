<template>
  <div>
    <HeaderComp>
      <div class="options" :style="style">Logo</div>
    </HeaderComp>

    <div class="container">
      <SidebarComp />
      <v-simple-table class="table" height="90vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Available</th>
              <th v-show="user.role === 'admin'" class="text-left">Actions</th>
              <th class="text-left">
                <router-link to="/add">
                  <v-btn v-show="user.role === 'admin'" color="primary">
                    Add New Book
                  </v-btn>
                </router-link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              :title="book.available ? '' : 'Out of stock'"
              :class="book.available ? '' : 'disabled'"
              v-for="book in books"
              :key="book.id"
            >
              <td>
                <v-img
                  :src="book.image_url"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="100px"
                  width="80px"
                  cover
                />
                {{ book.title }}
              </td>
              <td>{{ book.available }}</td>
              <td>

                <v-btn
                  v-show="user.role === 'admin'"
                  @click="deleteBook(book.id)"
                  color="primary"
                  >Delete Book</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <!-- <AGgrid v-if="books.length" :books="bookProp" /> -->
    <alertDailog />
  </div>
</template>

<script>
import HeaderComp from "../components/HeaderComp.vue";
import SidebarComp from "../components/SidebarComp";
import alertDailog from "../components/Dailog";
// import AGgrid from "./AGgrid";

import axios from "axios";
export default {
  name: "AdminPage",
  components: {
    HeaderComp,
    SidebarComp,
    alertDailog,
    // AGgrid,
  },
  data() {
    return {
      books: [],
      user: {},
      bookProp: [],
      style: "text-indent: 4em;",
    };
  },
  computed: {
    loginUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    async deleteBook(id) {
      const res = await axios.delete("http://localhost:3000/books/" + id);
      if (res.status === 200) {
        this.loadData();
      }
    },
    async loadData() {
      let user = localStorage.getItem("user-info") || {};
      if (!this.$store.state.isAuthenticated) {
        this.$router.push({ name: "LoginPage" });
      }
      let res = await axios.get("http://localhost:3000/books");
      this.user = JSON.parse(user);
      this.books = res.data;
      this.bookProp = this.books.map((book) => {
        return { title: book.title, available: book.available };
      });
    },
    async issueBook(id, bName) {
      let dt = new Date();
      let today = new Date();
      dt.setDate(dt.getDate() + 10);
      await axios.post("http://localhost:3000/issues", {
        bid: id,
        uid: this.user.id,
        uName: this.user.email,
        bName,
        dueDate: dt.toLocaleDateString(),
        issueDate: today.toLocaleDateString(),
      });
    },
  },
  async mounted() {
    await this.loadData();
  },
};
</script>

<style scoped>
img {
  width: 300px;
  height: 300px;
}
.container {
  display: flex;
  justify-content: space-between;
}
.table {
  width: 80vw;
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
</style>
