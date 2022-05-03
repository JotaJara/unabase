<template>
<nav class="nabb">
  <v-toolbar app height=50>
    <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text hidden-xl-and-up"></v-toolbar-side-icon>
    <v-toolbar-title class="grey--text">
      <span>unabase</span>
    </v-toolbar-title>
  </v-toolbar>
  <v-navigation-drawer app width=250 v-model="drawer">
    <v-layout column align-center>
      <v-img :src="require('@/assets/fav.png')" class="logo" alt="unabase"></v-img>
      <v-flex class="mt-2">
        <v-list>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route" class="mt-2">
            <v-list-tile-action>
              <v-icon class="green--text">{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="green--text">{{ link.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</nav>
</template>

<script>

export default {
  data () {
    return {
      drawer: true,
      links: [
        { icon: 'source', text: 'Post', route: '/posts' },
        { icon: 'person', text: 'Usuarios', route: '/users' }
      ]
    }
  }
}
</script>

<style>
.logo{
  margin-top: 15px;
  width: 111px;
  height: 111px;
}
.v-list__tile{
  font-size: 20px;
}
</style>
