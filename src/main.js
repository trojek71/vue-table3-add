import Vue from 'vue'
import App from './App.vue'
import { ApolloClient } from "apollo-client";
//import { createProvider } from 'vue-apollo';
import VueApollo from "vue-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
//import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from "apollo-link-ws";



Vue.config.productionTip = false;
const link = new WebSocketLink({
  uri: "ws://trojek.sytes.net:8089/v1/graphql",
  options: {
    reconnect: true,
    timeout: 60000
    //connectionParams: () => {
    //  return { headers: getHeaders() };
  }
});

const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);


new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app')
