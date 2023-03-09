import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreens'
function App() {
  return (
   
    <div >
    <Header />
   <main className='py-5'>
      <Container>
          <HomeScreen />
      </Container>
   </main>
    <Footer />
    </div>
  );
}

export default App ;
