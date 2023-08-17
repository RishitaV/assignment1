<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  name: 'App',


  components: {
  },

  data: () => ({
    
  }),
  mounted() {
    console.log('====> ', this.$store.state.user);
    // setUser();
  }
};
</script>
