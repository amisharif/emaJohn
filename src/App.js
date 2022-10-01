import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './components/Header/Header'
import Header from './components/Header/Header';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shop from './components/Shop/Shop'


function App() {
  return (
    
    <>
         <Header></Header>
       
  
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/product/:productKey' element={<ProductDetail/>}/>
          <Route path='/review' element={<Review/>}/>
        </Routes>
     
        </>
   


  );
}

export default App;
