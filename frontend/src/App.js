import Header from './components/Header'
import Footer from './components/Footer'
// import {Route, BrowserRouter as Router  } from 'react-router-dom';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreens from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-5'>
        <Container>
          <Routes>
          <Route path='/' element={<HomeScreen />}  exact/>
         
          <Route path='/login' element={<LoginScreen />}  />
          <Route path='/register' element={<RegisterScreen />}  />
          <Route path='/profile' element={<ProfileScreen />}  />
          <Route path='/login/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentScreen />}  />
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
