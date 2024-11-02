import React, { useState } from 'react';
import { Row, Col, Input, Modal, Button, Form, InputNumber } from 'antd';
import ProductCard from '../components/ProductCard';
import DatePickerComponent from '../components/DatePickerComponent';
import { useProducts } from './ProductContext';
import Navbar from './Navbar';
import '../styles/Page1.css';

const Page1 = () => {
  const { products, addProduct } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddProduct = (values) => {
    console.log('Adding Product:', values);
    addProduct(values);
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page1-container">
      <Navbar />
      <DatePickerComponent />
      <Input placeholder="Search products" value={searchQuery} onChange={handleSearch} style={{ marginBottom: 20 }} />
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 20 }}>
        Add New Product
      </Button>
      <Row gutter={[16, 16]}>
        {filteredProducts.map(product => (
          <Col key={product.id || product.title} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      <Modal
        title="Add New Product"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form onFinish={handleAddProduct}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{ width: '80%' }} />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="discountPercentage" label="Discount (%)" rules={[{ required: true }]}>
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Page1;
