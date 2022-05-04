<template>
  <div>
    <v-app>
      <v-content  class="text-xs-center" grid-list-lg>
        <router-view />
      </v-content>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',
  beforeCreate () {
    document.title = 'unabase | Vue CRUD'
  },
  created () {
    this.$store.dispatch('posts/cargarPosts')
    this.$store.dispatch('users/getAll')
  }
}
</script>

<style>
html, body {
  height: 100%;
  background-color: #ddd8d4;
}
#app {
  font-family: 'Roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  letter-spacing: 1px;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: 300;
}
</style>
