import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Tag } from 'antd';
import '../styles/ProductCard.css';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #ff7f50; /* Coral color */
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-left:26px;
  margin-top:5px;
  padding: 5px 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #ff6347; /* Slightly darker coral */
    transform: translateY(-2px);
  }

  &:active {
    background-color: #e5533d; /* Even darker coral for active state */
    transform: translateY(0);
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }
`;

const { Title, Text } = Typography;


const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  const handleClick=()=>{
    navigate(`/products/${product.id}`);
  }
  console.log(product);
  
  const imageUrl = product.imageData
  ? `data:image/jpeg;base64,${product.imageData}`
  : "fallback-image-url.jpg"; 
  
  return (
    <Card
      hoverable
      className="product-card"
      onClick={handleClick}
      cover={<img alt={product.title} src={imageUrl} className="product-image" />}
    >
      <div className="product-info">
        <Tag color="blue" className="product-category">
          {product.category}
        </Tag>
        <Title level={5} className="product-title">
          {product.title}
        </Title>
        <Text type="secondary" className="product-description">
          {product.description}
        </Text>
        <div className="product-price">
          <Text strong>₹ {product.price.toFixed(2)}</Text>{' '}
          {/* <Text delete className="product-mrp">
            MRP: ₹ {(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
          </Text> */}
          <StyledButton>Add To Cart</StyledButton>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
