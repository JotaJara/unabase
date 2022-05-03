<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Users </v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-dialog persistent v-model="dialog" full-width>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo User</v-btn>
        </template>
      <form method="POST" @submit.prevent="handleSubmit">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-xl>
              <v-layout row wrap justify-space-around>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.id" label="id"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="nombre"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.username" label="username"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" label="email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.phone" label="phone"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.website" label="website"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          <div class="body-2 text-lg-right red--text">*Campo Requerido</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" type="submit" flat>Guardar</v-btn>
          </v-card-actions>
          </v-card>
        </form>
      </v-dialog>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Busqueda"
        single-line
        hide-details
      ></v-text-field>
    </v-toolbar>
    <v-data-table
      rows-per-page-text="User por pagina"
      v-model="selected"
      select-all
      ref="dataTable"
      :headers="headers"
      :items="this.users.items"
      :search="search"
      class="elevation-1"
      disable-initial-sort
    >
      <template v-slot:items="user" @dblclick="editItem(user.item)">
        <tr>
        <td>
          <v-checkbox
            v-model="user.selected"
            color="green"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td @dblclick="editItem(user.item)">{{ user.item.id }}</td>
        <td class="px-0">
        <v-icon
            class="mr-2"
            @click="editItem(user.item)"
          >
            edit
          </v-icon>
          <v-icon
            class="mr-2"
            v-on:click="deleteThis(user.item)"
          >
            delete
        </v-icon>
        </td>
        <td class="text-xs-right" @dblclick="editItem(user.item)">{{ user.item.name }}</td>
        <td class="text-xs-right" @dblclick="editItem(user.item)">{{ user.item.username }}</td>
        <td class="text-xs-right" @dblclick="editItem(user.item)">{{ user.item.email }}</td>
        <td class="text-xs-right" @dblclick="editItem(user.item)">{{ user.item.phone }}</td>
        <td class="text-xs-right" @dblclick="editItem(user.item)">{{ user.item.website }}</td>
        </tr>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          No hay resultados para: "{{ search }}".
        </v-alert>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    search: '',
    selected: [],
    dialog: false,
    headers: [
      {
        text: 'id',
        align: 'left',
        sortable: true,
        value: 'id'
      },
      { text: 'Acciones', value: 'name', sortable: false },
      { text: 'Name', value: 'name', sortable: false },
      { text: 'Username', value: 'username', sortable: false },
      { text: 'E-mail', value: 'email', sortable: false },
      { text: 'Phone', value: 'phone', sortable: false },
      { text: 'Website', value: 'website', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      id: undefined,
      name: undefined,
      username: undefined,
      email: undefined,
      phone: undefined,
      website: undefined
    },
    defaultItem: {
      id: undefined,
      name: undefined,
      username: undefined,
      email: undefined,
      phone: undefined,
      website: undefined
    }
  }),
  computed: {
    ...mapState({
      users: state => state.users.all
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo User' : 'Editar User'
    }
  },
  watch: {
    dialog (val) {
      return val || this.close()
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions('users', {
      save: 'creaUser',
      guardar: 'updeitUser',
      delUser: 'dilitUser'
    }),
    handleSubmit (e) {
      this.submitted = true
      this.$validator.validate().then(valid => {
        if (valid) {
          var user = {
            id: this.editedItem.id,
            name: this.editedItem.name,
            username: this.editedItem.username,
            email: this.editedItem.email,
            phone: this.editedItem.phone,
            website: this.editedItem.website
          }
          if (this.editedIndex === -1) {
            this.save(user)
            this.close()
          } else {
            this.guardar(user)
            this.close()
          }
        }
      })
    },
    deleteThis (user) {
      var sure = confirm('Esta seguro que desea eliminar el Usuario n°' + user.id)
      if (sure === true) {
        this.delUser(user.id)
        alert('Usuario Eliminado')
      } else {
        alert('No se elimino el Usuario')
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    editItem (item) {
      this.editedIndex = this.users.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    }
  }
}
</script>
<style>
</style>
