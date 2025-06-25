import { useState, useEffect } from 'react';

export const useProductData = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    fetch('/js/data/productData.json')
      .then((res) => res.json())
      .then((dataArray) => {
        const map = {};
        dataArray.forEach((p) => {
          map[p.id] = p;
        });
        setProducts(map);
      })
      .catch((err) => console.error('Failed to load product data', err));
  }, []);

  return products;
};
