import React from 'react';
import './App.css';
import { Products } from './features/products/Products';
import { Cart } from './features/cart/Cart';

function App() {
  return (
    <div className="App">
      <Cart />
      <Products />
    </div>
  );
}

export default App;
