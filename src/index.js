import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Services from './components/Services/Services';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/./Review/./Review'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>

    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<App/>} />
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/service' element={<Services/>}/>
          <Route path='/product/:productKey' element={<ProductDetail/>}/>
          <Route path='/review' element={<Review/>}/>
          
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
