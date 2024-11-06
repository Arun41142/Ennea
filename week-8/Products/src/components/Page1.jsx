import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col } from 'antd';
import ProductCard from '../components/ProductCard';
import { useProducts } from './ProductContext';

const Page1 = () => {
  const { products, searchQuery } = useProducts();

  // Memoized filtered products to optimize re-renders
  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      return products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return products;
  }, [searchQuery, products]);

  return (
    <div className="page1-container">
      <Row gutter={[10, 10]} style={{ marginLeft: '100px', marginTop: '30px' }}>
        {filteredProducts.map(product => (
          <Col key={product.id} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Page1;
