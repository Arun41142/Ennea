import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Select, DatePicker, Checkbox, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const submitHandler = (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "prod",
      new Blob([JSON.stringify(values)], { type: "application/json" })
    );
    if (values.imageFile) {
      formData.append("imageFile", values.imageFile.file);
    }


    axios
      .post("http://localhost:8080/Api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        message.success("Product added successfully");
        form.resetFields();
      })
      .catch((error) => {
        message.error("Error adding product");
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Product</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={submitHandler}
        initialValues={{
          productAvailable: false,
        }}
      >

        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>


        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please enter the brand name" }]}
        >
          <Input placeholder="Enter brand name" />
        </Form.Item>


        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the product description" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: "Please enter the product price" },
            { pattern: /^[0-9]+$/, message: "Price must be a number" },
          ]}
        >
          <Input placeholder="Enter product price" prefix="$" />
        </Form.Item>


        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select category">
            <Option value="Laptop">Laptop</Option>
            <Option value="Headphone">Headphone</Option>
            <Option value="Mobile">Mobile</Option>
            <Option value="Electronics">Electronics</Option>
            <Option value="Toys">Toys</Option>
            <Option value="Fashion">Fashion</Option>
          </Select>
        </Form.Item>

        {/* Stock Quantity */}
        <Form.Item
          name="stockQuantity"
          label="Stock Quantity"
          rules={[
            { required: true, message: "Please enter stock quantity" },
            { pattern: /^[0-9]+$/, message: "Quantity must be a number" },
          ]}
        >
          <Input placeholder="Enter stock quantity" />
        </Form.Item>

        <Form.Item
          name="releaseDate"
          label="Release Date"
          rules={[{ required: true, message: "Please select the release date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Image */}
        <Form.Item
          name="imageFile"
          label="Product Image"
          valuePropName="file"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

 
        <Form.Item name="productAvailable" valuePropName="checked">
          <Checkbox>Product Available</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
