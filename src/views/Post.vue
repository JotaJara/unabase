<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Posts </v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-dialog persistent v-model="dialog" full-width>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Post</v-btn>
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
                  <v-text-field v-model="editedItem.userId" label="userId"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.titulo" label="titulo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-textarea v-model="editedItem.body" label="Body"></v-textarea>
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
      rows-per-page-text="Post por pagina"
      v-model="selected"
      select-all
      ref="dataTable"
      :headers="headers"
      :items="this.posts.items"
      :search="search"
      class="elevation-1"
      disable-initial-sort
    >
      <template v-slot:items="post" @dblclick="editItem(post.item)">
        <tr>
        <td>
          <v-checkbox
            v-model="post.selected"
            color="green"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td @dblclick="editItem(post.item)">{{ post.item.userId }}</td>
        <td class="px-0">
        <v-icon
            class="mr-2"
            @click="editItem(post.item)"
          >
            edit
          </v-icon>
          <v-icon
            class="mr-2"
            v-on:click="deleteThis(post.item)"
          >
            delete
        </v-icon>
        </td>
        <td class="text-xs-right" @dblclick="editItem(post.item)">{{ post.item.id }}</td>
        <td class="text-xs-right" @dblclick="editItem(post.item)">{{ post.item.title }}</td>
        <td class="text-xs-right" @dblclick="editItem(post.item)">{{ post.item.body }}</td>
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
      { text: 'User ID', value: 'userId', sortable: false },
      { text: 'Acciones', value: 'name', sortable: false },
      {
        text: 'ID',
        align: 'left',
        sortable: true,
        value: 'id'
      },
      { text: 'Titulo', value: 'title', sortable: false },
      { text: 'Body', value: 'body', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      userId: undefined,
      id: undefined,
      title: undefined,
      body: undefined
    },
    defaultItem: {
      userId: undefined,
      id: undefined,
      title: undefined,
      body: undefined
    }
  }),
  computed: {
    ...mapState({
      posts: state => state.posts.all
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Post' : 'Editar Post'
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
    ...mapActions('posts', {
      save: 'creaPost',
      guardar: 'updeitPost',
      delPost: 'dilitPost'
    }),
    handleSubmit (e) {
      this.submitted = true
      this.$validator.validate().then(valid => {
        if (valid) {
          var post = {
            id: this.editedItem.id,
            userId: this.editedItem.userId,
            title: this.editedItem.title,
            body: this.editedItem.body
          }

          if (this.editedIndex === -1) {
            this.save(post)
            this.close()
          } else {
            this.guardar(post)
            this.close()
          }
        }
      })
    },
    deleteThis (post) {
      var sure = confirm('Esta seguro que desea eliminar el Post n°' + post.id)
      if (sure === true) {
        this.delPost(post.id)
        alert('Post Eliminado')
      } else {
        alert('No se elimino el Post')
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
      this.editedIndex = this.posts.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    }
  }
}
</script>
<style>
</style>
