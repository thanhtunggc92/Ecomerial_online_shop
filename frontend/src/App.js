import Header from './components/Header'
import Footer from './components/Footer'
// import {Route, BrowserRouter as Router  } from 'react-router-dom';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import HomeScreen from './screens/HomeScreens';
import ProductScreen from './screens/ProductScreen';
import CartScreens from './screens/CartScreens';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-5'>
        <Container>
          <Routes>
          <Route path='/' element={<HomeScreen />}  />
          <Route path='/product/:id'   element={<ProductScreen />} />
          <Route path='/cart/:id?'   element={<CartScreens />} />
          </Routes>
         
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
