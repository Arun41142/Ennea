import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, message } from 'antd';
import { useProducts } from './ProductContext';
import { PlusCircleOutlined } from '@ant-design/icons'; 
import DatePickerComponent from './DatePickerComponent';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { addProduct } = useProducts();
  const [isVisible, setIsVisible] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleAddProduct = (values) => {
    // Add the product to context or database
    addProduct(values);

    // Reset the form and close the modal
    form.resetFields();
    setIsVisible(false);

    // Show success message
    message.success('Product added successfully!');

    // Redirect to the products page
    navigate('/products');
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
          <Button key="confirm" type="primary" onClick={() => form.submit()}>
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
