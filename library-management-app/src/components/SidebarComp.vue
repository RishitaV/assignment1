<template>
  <div class="sidebar">
    <router-link to="/home">
      <div>
        <HomeAccount />
        <span to="/" icon="fas fa-home">Main Menu</span>
      </div>
    </router-link>
    <router-link to="/add">
      <div>
        <BookPlus />
        <span to="/dashboard" icon="fas fa-columns">Add Books</span>
      </div>
    </router-link>
    <router-link to="/issueBook">
      <div>
        <BookCheck />
        <span to="/dashboard" icon="fas fa-columns">Issue Books</span>
      </div>
    </router-link>
    <router-link to="/custDetails">
      <div>
        <AccountDetails />
        <span icon="fas fa-users">Customer Details</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import HomeAccount from "vue-material-design-icons/HomeAccount.vue";
import BookPlus from "vue-material-design-icons/BookPlus.vue";
import BookCheck from "vue-material-design-icons/BookCheck.vue";
import AccountDetails from "vue-material-design-icons/AccountDetails.vue";

export default {
  name: "SidebarComp",
  props: {},
  // components: {
  //   SvgIcon,
  // },

  // data() {
  //   return {
  //     path: mdiAccount,
  //   };
  // },
  components: {
    HomeAccount,
    BookPlus,
    BookCheck,
    AccountDetails,
  },
};
</script>

<style>
:root {
  --sidebar-bg-color: #000000;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: relative;
  top: 5%;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  width: 20%;
  height: 100vh;
  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.sidebar span:hover {
  background-color: #ddd;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>