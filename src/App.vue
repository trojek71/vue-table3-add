<template>
  <div id="app">
    <h1>Users</h1>
    <user-table />
    <user-form />
  </div>
</template>

<script>
import UserTable from './components/UserTable.vue'
import UserForm  from './components/UserForm'
export default {
  name: 'app',
  components: {
    UserTable,
    UserForm
  },


}
</script>

<style>
button {
    background: #009435;
    border: 1px solid #009435;
  }

  .small-container {
    max-width: 680px;
  }
</style>
