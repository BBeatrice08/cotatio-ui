<template>
  <v-app>
    <v-card>
      <v-app-bar
        app
        color="accent"
        dark
      >
      <div v-if="currentUser.firstName">
        <div class="d-flex align-center">
          <v-btn text to="/user/home">COTATIO</v-btn>
        </div>
      </div>
      <div v-else>
        <v-btn text class="mr-2" to="/">COTATIO</v-btn>
      </div>

        <v-spacer></v-spacer>

        <div v-if="currentUser.firstName">
          {{ currentUser.firstName }}
          <v-btn text class="mr-2" @click="logoutUser">Logout</v-btn>
          <v-btn text class="mr-2" to="/users">Register</v-btn>
        </div>
        <div v-else>
          <v-btn text class="mr-2" to="/">Login</v-btn>
        </div>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </v-card>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',

  components: {
  },

  methods: {
    test() {
      console.log(`test`);
    },
    logoutUser() {
      this.$store.dispatch("logoutUser");
    },
    whenLogout() {
      this.$router.push({ path:`/`});
    }
  },

  computed: {
    userName() {
      return `${this.user.firstname} ${this.user.lastname}`;
    },
    ...mapState(['currentUser']),
  },

  data: () => ({
    user: {
      firstname: `Étienne`,
      lastname: `G`,
    }
  }),
  mounted() {
    this.$store.dispatch('loadCurrentUser');
  }
};
</script>
