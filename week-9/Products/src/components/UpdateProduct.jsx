import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Checkbox, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom"; // Import useParams 
const { Option } = Select;

const UpdateProduct = ({ match }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { id } = useParams(); // Get product ID from route params

  // Fetch product data when component mounts
  console.log(id);
  
  useEffect(() => {
    axios
      .get(`http://localhost:8090/Api/products/${id}`)
      .then((response) => {
        form.setFieldsValue({
          ...response.data,
          releaseDate: response.data.releaseDate ? moment(response.data.releaseDate, "DD-MM-YYYY") : null,
        });
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        message.error("Error fetching product data");
      });
  }, [id, form]);

  // Handle form submission
  const submitHandler = (values) => {
    setLoading(true);

    const formattedValues = {
      ...values,
      releaseDate: values.releaseDate.format("DD-MM-YYYY"), // Format release date
    };

    axios
      .put(`http://localhost:8090/Api/products/${id}`, formattedValues, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        message.success("Product updated successfully");
        form.resetFields();
      })
      .catch((error) => {
        message.error("Error updating product");
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Update Product</h2>
      <Form form={form} layout="vertical" onFinish={submitHandler}>
        {/* Product Name */}
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        {/* Brand */}
        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: "Please enter the brand" }]}
        >
          <Input placeholder="Enter brand name" />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter the product description" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>

        {/* Price */}
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter the product price" }]}
        >
          <Input prefix="$" placeholder="Enter product price" />
        </Form.Item>

        {/* Category */}
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
          rules={[{ required: true, message: "Please enter stock quantity" }]}
        >
          <Input placeholder="Enter stock quantity" />
        </Form.Item>

        {/* Release Date */}
        <Form.Item
          name="releaseDate"
          label="Release Date"
          rules={[{ required: true, message: "Please select the release date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Image URL */}
        <Form.Item
          name="imageUrl"
          label="Product Image URL"
          rules={[{ required: true, message: "Please provide the image URL" }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>

        {/* Availability */}
        <Form.Item name="productAvailable" valuePropName="checked">
          <Checkbox>Product Available</Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? "Submitting..." : "Update Product"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
