<template>
  <div>
    <h3>Add New Book</h3>
    <div class="container py-5 main-container">
      <form>
        <div>
          <v-text-field v-model="book.name" label="Book Name"></v-text-field>
        </div>

        <div>
          <v-text-field
            v-model="password"
            label="Book Description"
          ></v-text-field>
        </div>
        <div>
          <v-file-input
            v-model="book.image"
            accept="image/*"
            label="File input"
          ></v-file-input>
        </div>
        <div>
          <v-text-field
            v-model="book.noOfBooks"
            label="Available"
          ></v-text-field>
        </div>
        <v-btn @click="addBook" class="ma-2" color="primary">
          Add New Book
        </v-btn>
      </form>
    </div>
  </div>
</template>

    <script>
import axios from "axios";
export default {
  name: "AddBook",
  data() {
    return {
      book: {
        name: "",
        image: "",
        noOfBooks: "",
      },
    };
  },
  methods: {
    async addBook() {
      const res = await axios.post("http://localhost:3000/books", {
        title: this.book.name,
        image_url: JSON.stringify(this.book.image),
        available: this.book.noOfBooks,
      });
      console.log(res);
    },
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "LoginPage" });
    }
  },
};
</script>