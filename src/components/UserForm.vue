<template>
<div id="user-form">
  <form @submit="submit">
    <fieldset>
      <input type="text" placeholder="First Name" v-model="firstName" />
      <input type="text" placeholder="Director" v-model="lastName" />
      <input type="text" placeholder="Composer" v-model="email" />
      
    </fieldset>
    <input class="button-primary" type="submit" value="Send" />
  </form>
</div>
</template>
<script>
import gql from "graphql-tag";
//import { InMemoryCache } from "apollo-cache-inmemory";
const ADD_CONTACT = gql`
  mutation addContact(
    $firstName: String!
    $lastName: String!
    $email: String!
   
  ) {
    insert_contacts(
      objects: [
        {
          firstName: $firstName
          lastName: $lastName
          email: $email
          
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;
export default {
  name: "AddContact",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      
    };
  },
  apollo: {},
  methods: {
    submit(e) {
      e.preventDefault();
      const { firstName, lastName, email} = this.$data;
      this.$apollo.mutate({
        mutation: ADD_CONTACT,
        variables: {
          firstName,
          lastName,
          email,
        },
      });
    }
  }
};
</script>
