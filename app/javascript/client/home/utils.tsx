import React, { useState, useEffect } from 'react';
import { ProductInfoFragment } from '../graphqlTypes';
import { ProductThumbnail } from 'client/product/thumbnail/ProductThumbnail';

export const filterProductThumbnails = (
    products: ProductInfoFragment[],
    countyFilter: string,
    categoryFilter: string
  ) => {
    let productsToReturn;

    if (countyFilter === 'default' && categoryFilter === 'default') {
      productsToReturn = products;
    } else if (categoryFilter === 'default') { // County has been chosen
      productsToReturn = products.filter(product => product.counties?.some(county => county.name === countyFilter));
      if (productsToReturn.length === 0) {
        productsToReturn = products.filter(product => product.styleNumber === "19" || product.styleNumber === "21");
      }
      const sign22 = products.find(product => product.styleNumber === "22");
      sign22 && productsToReturn.push(sign22);
    } else { // Category has been chosen
      productsToReturn = products.filter(product => product.categories?.some(category => category.name === categoryFilter));
    }

    return productsToReturn.map(product => {
      return <ProductThumbnail key={product.id} product={product} />;
    });
}

export const useWindowSize = ()=>{

    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      
      window.addEventListener("resize", handleResize);
      
      handleResize();
      
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowSize;
}