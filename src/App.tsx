import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Header from './components/header';
import Single from './pages/single';
import Locations from './pages/locations';
import { NotFound } from './pages/not-found';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // Ubah dengan endpoint GraphQL kamu
  cache: new InMemoryCache()
});

function App() {
  // const [count, setCount] = useState(0)

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<Single />} />
          <Route path='/location' element={<Locations />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App
