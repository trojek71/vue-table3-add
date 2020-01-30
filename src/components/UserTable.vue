<template>
  <div id="user-table">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{contact.id}}</td>
          <td>{{contact.firstName}}</td>
          <td>{{contact.lastName}}</td>
          <td>{{contact.email}}</td>
          <td>
            <button @click="selectContact(contact)">Select</button>
            <button @click="deleteContact(contact.id)">Delete</button>
            
          </td>
        </tr>
      
        
      </tbody>
       
    </table>
    <form>
         <label>Update contact</label>
        
         <input type="text" name="firstName" v-model="firstName"/>
         <input type="text" name="lastName" v-model="lastName"/>
         <input type="text" name="emailName" v-model="email"/>
         <input v-if="id" type="button" @click="updateContact(id, firstName, lastName, email)" value="Update">
       </form>
  </div>
</template>

<script>
import gql from "graphql-tag";

const DEL_CONTACT = gql`
   mutation delete_contact($id: Int!) {
     delete_contacts(where: { id: { _eq: $id } }) {
       affected_rows
     }
   }
 `;
const GET_CONTACTS = gql`
  subscription getContacts {
    contacts {
      id
      firstName
      lastName
      email
    }
  }
`;
const UPDATE_CONTACT = gql`
  mutation update_contacts($id: Int!, $firstName: String!, $lastName: String!, $email: String!){
    update_contacts(where: { id: {_eq: $id}}, _set:{firstName : $firstName, lastName: $lastName, email: $email}){
      affected_rows
    }
  }
`;


  export default {
    name: 'user-table',
  
  data(){
  return {
          contacts:[],
          id:null,
          firstName:'',
          lastName:'',
          email:''
  }
},
apollo:{
    $subscribe:{
        contacts: {
        query: GET_CONTACTS,
       result(data){
       this.contacts =data.data.contacts;
}
        }
           
           
        },
    
},
methods: {
 

  deleteContact(id){
         
          this.$apollo.mutate({
              mutation:  DEL_CONTACT,
              variables:{
                id: id,
              },
            }
          )
      
        },    
  updateContact(id, firstName, lastName, email){
    this.$apollo.mutate({
      mutation: UPDATE_CONTACT,
      variables:{
        id:id,
        firstName: firstName,
        lastName: lastName,
        email:email,
      },
    })
  },
  selectContact(contact){
          this.id = contact.id;
          this.firstName = contact.firstName;
          this.lastName = contact.lastName;
          this.email = contact.email;
    },
    clearForm(){
      this.id = null;
      this.firstName = '';
      this.lastName = '';
      this.email = '';
    }    
    }
  }
</script>

<style scoped></style>