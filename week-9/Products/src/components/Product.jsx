import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Image, Tag, Breadcrumb, message, Modal } from "antd";
import { HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "../styles/Product.css";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/Api/products/${id}`);
        setProduct(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching product:", error);
        message.error("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // console.log(product.imageUrl);
  
  const handleEditClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleDeleteClick = () => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this product?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:8090/Api/products/${product.id}`);
          message.success("Product deleted successfully!");
          navigate("/products");
        } catch (error) {
          console.error("Error deleting product:", error);
          message.error("Failed to delete product");
        }
      },
    });
  };


  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <Button type="primary" onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">

      {/* Product Detail Card */}
      <Card
        className="product-detail-card"
        hoverable
        cover={
          <Image
            src={product.imageUrl}
            alt="Product"
            fallback="fallback-image-url.jpg"
            className="product-detail-image"
          />
        }
      >
        <div className="product-detail-content">
          <Tag color="blue" className="category-tag">
            {product.category}
          </Tag>
          <h1>{product.name}</h1>
          <h4 style={{ color: "gray" }}>{product.brand}</h4>
          <p>{product.description}</p>

          <div className="product-info">
            <h3 style={{ color: "#1890ff" }}>{"$" + product.price}</h3>
            <p>
              <strong>Stock Available:</strong>{" "}
              <span style={{ color: product.stockQuantity > 0 ? "green" : "red" }}>
                {product.stockQuantity}
              </span>
            </p>
            <p>
              <strong>Release Date:</strong> {product.releaseDate}
            </p>
          </div>

          <div className="product-actions">
            {/* <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              disabled={!product.productAvailable}
              style={{ marginBottom: "10px", width: "100%" }}
            >
              {product.productAvailable ? "Add to Cart" : "Out of Stock"}
            </Button> */}
            <div className="action-buttons">
              <Button type="primary" onClick={handleEditClick}>
                Update
              </Button>
              <Button danger onClick={handleDeleteClick}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Product;
