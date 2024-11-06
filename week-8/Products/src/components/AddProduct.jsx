import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, message } from 'antd';
import { useProducts } from './ProductContext';
import { PlusCircleOutlined } from '@ant-design/icons'; 
import DatePickerComponent from './DatePickerComponent';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { addProduct } = useProducts();
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);  // New state for loading
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleAddProduct = async (values) => {
    setLoading(true);  // Start loading

    try {
      // Send the POST request to add the product
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Add the product to context or local state if needed
        addProduct(data);  // Update context with the new product

        // Reset the form and close the modal
        form.resetFields();
        setIsVisible(false);

        // Show success message
        message.success('Product added successfully!');

        // Redirect to the products page
        navigate('/products');
      } else {
        throw new Error(data.message || 'Failed to add product');
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);  // End loading
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleShowModal = () => {
    setIsVisible(true);
  };

  return (
    <>
      <Modal
        title="Add New Product"
        visible={isVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" loading={loading} onClick={() => form.submit()}>
            Confirm
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleAddProduct} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the product title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL" rules={[{ required: true, message: 'Please input the image URL!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the price!' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please input the category!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="discountPercentage" label="Discount (%)" rules={[{ required: true, message: 'Please input the discount percentage!' }]}>
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="Date" label="Start and End Date">
            <DatePickerComponent />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
