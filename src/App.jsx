import './App.css';
import BookList from "./components/booklist.jsx";
import Entry from './components/entry.jsx';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";

const  client = new ApolloClient({
  uri:"http://localhost:3001/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      {/* <Entry/> */}
      <BookList/>
    </div>
    </ApolloProvider>
  );
}

export default App;
