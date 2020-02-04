<template>
<div id="user-form">
    <h4> Add new  contact</h4>
  <form @submit="submit">
    <fieldset>
      <input type="text" placeholder="First Name" v-model="firstName" />
      <input type="text" placeholder="Last Name" v-model="lastName" />
      <input type="text" placeholder="email" v-model="email" />
      <input type="text" placeholder="state" v-model="state" />
      <input type="text" placeholder="city" v-model="city" />
      <input type="text" placeholder="street" v-model="street" />
      <input type="text" placeholder="house" v-model="house_nr" />
      <input type="text" placeholder="flat" v-model="flat_nr" />
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
    $state: String!
    $city: String!
    $street: String!
    $house_nr: Int!
    $flat_nr: Int!
   
  ) {
    insert_contacts(
      objects: [
        {
          firstName: $firstName
          lastName: $lastName
          email: $email
          address: {
            data:{
              state: $state
              city: $city
              street: $street
              house_nr: $house_nr
              flat_nr: $flat_nr
            }

          }
        }
      ]
    ) {
      returning {
        id
        address {
          id
        }
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
      state: "",
      city:"",
      street: "",
      house_nr:"",
      flat_nr: "",
      
    };
  },
  apollo: {},
  methods: {
    submit(e) {
      e.preventDefault();
      const { firstName, lastName, email, state, city, street, house_nr, flat_nr } = this.$data;
      this.$apollo.mutate({
        mutation: ADD_CONTACT,
        variables: {
          firstName,
          lastName,
          email,
          state,
          city,
          street,
          house_nr,
          flat_nr
        },
      });
    }
  }
};
</script>
