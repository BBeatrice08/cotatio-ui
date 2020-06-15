<template>
  <div class="home">
    <template v-if="true">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
      <p>{{ user }}</p>
      <p>{{ user.firstName }}</p>
      <p>{{ user.lastName }}</p>
      <p>{{ user.age }}</p>
    </template>
    <div v-if="user.age < 32">
      You're young
    </div>
    <div v-else>
      You're old
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue';
import api from '@/lib/api.js';

export default {
  name: 'Home',
  data () {
    return {
      user: {},
    }
  },
  // components: {
  //   HelloWorld,
  // },
  mounted () {
    api.get('/')
    .then((response) => {
      //console.log(response.data);
      this.user = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
    console.log(this.$route.name);
  }
};
</script>
