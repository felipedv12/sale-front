import './App.css';
import Header from './components/common/Header';
import Home from './components/pages/Home';
import ProductTypes from './components/pages/ProductTypes/ProductTypes';
import Products from './components/pages/Products/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sales from './components/pages/Sales/Sales';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header></Header>

      
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/product-types" element={<ProductTypes />}></Route>
          <Route path="/sales" element={<Sales />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
