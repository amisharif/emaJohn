import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './components/Header/Header'
import Header from './components/Header/Header';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shop from './components/Shop/Shop'
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import Shipment from './components/Shipment/Shipment';
import ManageInventory from './components/ManageInventory/ManageInventory';

export const UserContext = createContext();

function App() {

  const [loggedInUser,setLoggedInUser] = useState({});

  return (

    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>

      <h2>email:{loggedInUser.email} </h2>
      <Header></Header>

      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/login' element={<Login />} />
        <Route path='/shipment' element={<Shipment />} />
        <Route path='/inventory' element={<ManageInventory />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:productKey' element={<ProductDetail />} />
        <Route path='/review' element={<Review />} />
      </Routes>

    </UserContext.Provider>



  );
}

export default App;
