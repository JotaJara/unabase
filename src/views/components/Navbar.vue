<template>
<nav>
  <v-toolbar app height=50>
    <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text hidden-xl-and-up"></v-toolbar-side-icon>
    <v-toolbar-title class="grey--text">
      <span>unabase</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat color="grey" @click="salir">
      <span>Salir</span>
      <v-icon right>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
  <v-navigation-drawer
  app
  width=250
  :mini-variant="mini"
  mini-variant-width=88
  v-model="drawer">
    <v-layout column align-center>
      <v-flex class="mt-2">
        <v-img :src="require('@/assets/fav.png')" class="logo" alt="unabase"></v-img>
      </v-flex>
      <v-flex>
        <v-list>
          <v-list-tile v-if="!mini">
            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-if="mini">
            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
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
      mini: true,
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
  height: 77px;
  width: 77px;
}
</style>
