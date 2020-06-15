<template>
  <div id="tata">
    <h1>{{ bonjour.key }}</h1>
    <router-view />
  </div>
</template>

<script>
import bonjour from '../hello';

export default {
  name: 'Accueil',
  data() {
    return {
      bonjour
    }
  },
};

</script>

<style>
#tata {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
