import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, message } from 'antd';
import axios from 'axios';
import { useProducts } from './ProductContext';
import '../styles/Page2.css';

const { Title, Text } = Typography;

const Page2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const product = location.state?.product;

  if (!product) {
    return <Text>No product details to confirm.</Text>;
  }

  const handleConfirm = () => {
    axios.post('https://dummyjson.com/products/add', product)
      .then(response => {
        message.success('Product added successfully!');
        addProduct(product);  
        console.log(response.data.products);
        navigate('/');
      })
      .catch(error => {
        message.error('Error adding product.');
        console.error(error);
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="page2-container">
      <Card className="confirmation-card">
        <Title level={4}>Confirm Product Details</Title>
        <Text><strong>Title:</strong> {product.title}</Text><br />
        <Text><strong>Description:</strong> {product.description}</Text><br />
        <Text><strong>Price:</strong> ₹{product.price.toFixed(2)}</Text><br />
        <Text><strong>Category:</strong> {product.category}</Text><br />
        <Text><strong>Discount:</strong> {product.discountPercentage}%</Text><br />
        <div className="button-group">
          <Button type="primary" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button onClick={handleCancel} style={{ marginLeft: 10 }}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Page2;
