<template>
  <div>
    <div class="alert__container">
      <div
        class="container"
        v-for="issuedBook in issuedBooks"
        :key="issuedBook.id"
      >
        <v-alert
          dismissible
          v-show="showDueBooksAlert(issuedBook)"
          type="error"
        >
          {{ alertMessage(issuedBook) }}
        </v-alert>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "alertDailog",
  data() {
    return {
      issuedBooks: [],
    };
  },
  methods: {
    alertMessage(issuedBook) {
      if (this.user.role === "admin") {
        return `due date for ${this.user.email} (${issuedBook.bookName}) is ${issuedBook.bookDueDate}`;
      }
      return `${issuedBook.bookName} to be returned on ${issuedBook.bookDueDate}`;
    },
    async loadData() {
      await this.$store.dispatch("setIssues");
      const res = await this.$store.getters.issues;
      const user = this.$store.state.user;
      if (user.role === "admin") {
        this.issuedBooks = res;
        return;
      }
      this.issuedBooks = res.filter((issuedBook) => {
        return issuedBook.userName === user.email;
      });
    },
    showDueBooksAlert(issuedBook) {
      const bookDueDate = new Date(issuedBook.bookDueDate);
      const today = new Date();
      if (
        bookDueDate.getDate() < today.getDate() &&
        bookDueDate.getMonth() > today.getMonth()
      ) {
        return bookDueDate.getDate() + 30 - today.getDate() <= 3;
      }
      return bookDueDate.getDate() - today.getDate() <= 3;
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    issues() {
      return this.$store.getters.issues;
    },
  },
  async mounted() {
    this.loadData();
  },
  created() {
    this.$store.dispatch("setIssues");
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
.alert__container {
  position: absolute;
  z-index: 1;
  right: 0;
}
</style>