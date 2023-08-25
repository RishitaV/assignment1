<template>
  <div>
    <h3>Add New Book</h3>
    <div class="container py-5">
      <v-form>
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
      </v-form>
    </div>
  </div>
</template>

    <script>
export default {
  name: "AddBook",
  data() {
    return {
      book: {},
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    async addBook() {
      this.$store.dispatch("addNewBook", {
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