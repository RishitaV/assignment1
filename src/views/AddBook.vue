<template>
  <div>
    <h3>Add New Book</h3>
    <div class="container py-5 main-container">
      <form>
        <div>
          <v-text-field
            :rules="[rules.required]"
            v-model="book.name"
            label="Book Name"
          ></v-text-field>
        </div>

        <div>
          <v-text-field
            v-model="book.description"
            label="Book Description"
          ></v-text-field>
        </div>
        <div>
          <v-text-field v-model="book.image" label="File input"></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="book.noOfBooks"
            type="number"
            label="Available"
            :rules="[rules.required]"
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
        description: "",
        image: "",
        noOfBooks: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    async addBook() {
      await axios.post("http://localhost:3000/books", {
        title: this.book.name,
        image_url: this.book.image,
        available: this.book.noOfBooks,
      });
      this.$router.push({ name: "AdminPage" });
    },
  },
  async mounted() {
    if (!this.$store.state.isAuthenticated) {
      this.$router.push({ name: "LoginPage" });
    }
  },
};
</script>