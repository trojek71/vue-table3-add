<template>
<div id="user-form">
    <h4> Add new  contact</h4>
  <form @submit="submit">
    <fieldset>
      <input type="text" placeholder="First Name" v-model="firstName" />
      <input type="text" placeholder="Last Name" v-model="lastName" />
      <input type="text" placeholder="email" v-model="email" />
      <input type="text" placeholder="country" v-model="country" />
      <input type="text" placeholder="city" v-model="city" />
      <input type="text" placeholder="street" v-model="street" />
      <input type="text" placeholder="house" v-model="houseNr" />
     
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
    $country: String!
    $city: String!
    $street: String!
    $houseNr: Int!
   
  ) {
    insert_contacts(
      objects: [
        {
          firstName: $firstName
          lastName: $lastName
          email: $email
          address: {
            data:{
              country: $country
              city: $city
              street: $street
              houseNr: $houseNr
              
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
      country: "",
      city:"",
      street: "",
      houseNr:"",
      
      
    };
  },
  apollo: {},
  methods: {
    submit(e) {
      e.preventDefault();
      const { firstName, lastName, email, country, city, street, houseNr, id, } = this.$data;
      this.$apollo.mutate({
        mutation: ADD_CONTACT,
        variables: {
          firstName,
          lastName,
          email,
          country,
          city,
          street,
          houseNr,
          id,

        },
      });
    }
  }
};
</script>
