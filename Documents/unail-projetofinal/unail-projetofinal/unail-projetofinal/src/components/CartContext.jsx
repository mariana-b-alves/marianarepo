import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  const addToCart = (product) => {
    const quantityToAdd = product.quantity > 0 ? product.quantity : 1;
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        item => item.id === product.id && item.color === product.color
      );
  
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id && item.color === product.color
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: quantityToAdd }];
      }
    });
  };

  const removeFromCart = (id, color) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === id && item.color === color))
    );
  };

  const updateQuantity = (id, color, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.color === color
          ? { ...item, quantity: quantity > 0 ? quantity : 1 }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const isInCart = (id, color) => {
    return cartItems.some(item => item.id === id && item.color === color);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
