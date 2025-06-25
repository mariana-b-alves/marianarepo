import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import ProductDetail from './components/ProductDetail';
import { CartProvider } from './components/CartContext';
import TransactionForm from './components/TransactionForm';

function App() {
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const openTransactionForm = () => setShowTransactionForm(true);
  const closeTransactionForm = () => setShowTransactionForm(false);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={<ProductPage onCheckoutClick={openTransactionForm} />} 
          />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>

        {showTransactionForm && (
          <TransactionForm onClose={closeTransactionForm} />
        )}
      </Router>
    </CartProvider>
  );
}

export default App;
