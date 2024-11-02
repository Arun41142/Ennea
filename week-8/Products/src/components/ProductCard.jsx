import React from 'react';
import { Card, Typography, Tag } from 'antd';
import '../styles/ProductCard.css';

const { Title, Text } = Typography;

const ProductCard = ({ product }) => {
  const imageUrl=product.image || product.thumbnail;
  return (
    <Card
      hoverable
      className="product-card"
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
          <Text delete className="product-mrp">
            MRP: ₹ {(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
