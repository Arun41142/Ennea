import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import ProductCard from '../components/ProductCard';
import { useProducts } from './ProductContext';
import { useLocation } from 'react-router-dom';


const Page1 = () => {
  const { products } = useProducts();
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const searchQuery = location.state?.searchQuery || '';
    if (searchQuery) {
      const results = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  }, [location.state, products]);

  return (
    <div className="page1-container">
      <Row gutter={[10, 10]} style={{ marginLeft: '100px', marginTop: '30px' }}>
        {filteredProducts.map(product => (
          <Col key={product.id || product.title || product.category} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Page1;
