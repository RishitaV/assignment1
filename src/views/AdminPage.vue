<template>
  <div>
    <HeaderComp >
      <div class="options" :style="style"> Logo</div>
    </HeaderComp>
    <div class="container">
      <SidebarComp />
      <v-simple-table class="table" height="90vh">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Available</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
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
              <!-- <td>{{ book.title }}</td> -->
              <td>{{ book.available }}</td>
              <td>
                <v-btn
                  v-show="user.role === 'user'"
                  @click="issueBook(book.id, book.title)"
                  color="primary"
                  >Issue Book</v-btn
                >
                <router-link to="/add"
                  ><v-btn v-show="user.role === 'admin'" color="primary"
                    >Add Book</v-btn
                  ></router-link
                >
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
    <alertDailog />
  </div>
</template>

<script>
import HeaderComp from "../components/HeaderComp.vue";
import SidebarComp from "../components/SidebarComp";
import alertDailog from "../components/Dailog";
import axios from "axios";
export default {
  name: "AdminPage",
  components: {
    HeaderComp,
    SidebarComp,
    alertDailog,
  },
  data() {
    return {
      books: [],
      user: {},
      style: "text-indent: 4em;"
    };
  },
  methods: {
    async deleteBook(id) {
      const res = await axios.delete("http://localhost:3000/books/" + id);
      console.log("res==>", res);
      if (res.status === 200) {
        this.loadData();
      }
    },
    async loadData() {
      let user = localStorage.getItem("user-info");
      if (!user) {
        this.$router.push({ name: "LoginPage" });
      }
      let res = await axios.get("http://localhost:3000/books");
      this.user = JSON.parse(user);
      this.books = res.data;
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
    this.loadData();
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
.container {
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  align-items: flex-start;
  /* width: 50%; */
}
</style>
