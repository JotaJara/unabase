<template>
  <div>
    <Navbar/>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/views/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  beforeCreate () {
    document.title = 'unabase | Vue CRUD'
  }
}
</script>

<style>
  .v-list__tile__action .v-icon {
    cursor: pointer;
  }
</style>
