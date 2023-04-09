import logo from './logo.svg';
import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import GetUsers from './Components/GetUsers';
import Form from './Components/Form';


//to catch errors
const errorLink = onError(({graphqlErrors, networkError}) =>{
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) =>{
      alert(`Error - ${message}`)
    })
  }
})


//build http link graphql api
const link = from([
  errorLink,
  new HttpLink({
    uri:"http://localhost:8081/graphql",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    fetchOptions: {
      mode: 'no-cors'
    }
  })
])

//create a instance of apollo client 
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return (
    <ApolloProvider client={client}>
      {" "}
      {/* <GetUsers /> */}
      <Form/>
    </ApolloProvider>  
  );
}

export default App;
