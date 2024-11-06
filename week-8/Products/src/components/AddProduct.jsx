import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import { useProducts } from './ProductContext';
import { PlusCircleOutlined } from '@ant-design/icons'; 
import DatePickerComponent from './DatePickerComponent';

const AddProduct = () => {
  const { addProduct } = useProducts();
  const [isVisible, setIsVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddProduct = (values) => {
    addProduct(values);
    form.resetFields();
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  const handleShowModal = () => {
    setIsVisible(true);
  };

  return (
    <>
        <h1 style={{margin:'5%',textAlign:'center'}}>You Can Add The Products You need.....</h1>
      <Button
        type="primary"
        shape="circle"
        icon={<PlusCircleOutlined />}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 10,
          borderRadius: '50%',
          fontSize: '24px',
        }}
        onClick={handleShowModal}
      />
      
      <Modal
        title="Add New Product"
        visible={isVisible}
        onCancel={handleCancel}
        footer={null}
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
          <Form.Item name="Date" label="start and End date" rules={[{ required: true, message: 'Please input the discount percentage!' }]}>
            <DatePickerComponent/>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default AddProduct;
