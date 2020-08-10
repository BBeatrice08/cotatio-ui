<template>
  <v-app>
    <v-card>
      <v-app-bar
        app
        color="accent"
        dark
      >
        <div class="d-flex align-center">
          <v-btn text to="/">COTATIO</v-btn>
        </div>

        <v-spacer></v-spacer>

        <div v-if="currentUser.firstName">
          {{ currentUser.firstName }}
          <v-btn text class="mr-2" @click="logoutUser">Logout</v-btn>
        </div>
        <div v-else>
          <v-btn text class="mr-2" to="/login">Login</v-btn>
          <v-btn text class="mr-2" to="/registration">Register</v-btn>
        </div>

        <v-menu v-if="false" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              color="white"
              text
              v-on="on"
            >
              {{ user.firstname }} {{ user.lastname }}
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="test">
              <v-list-item-title>
                <v-icon>account_box</v-icon>
                Mon profil
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="test">
              <v-list-item-title>
                <v-icon>exit_to_app</v-icon>
                Se déconnecter
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-content>
        <router-view />
      </v-content>
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
