import '../styles/nav.css';
import React,{useState} from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { useProducts } from './ProductContext';
import { Link, useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #081b29;
  color: white;
  padding: 1.5%;
  justify-content: space-between;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const Links = styled.div`
  display: flex;
  gap: 40px;
  font-size:18px;
`;


const Navbar = () => {
  const { searchQuery, setSearchQuery } = useProducts();
  const navigate = useNavigate();
  const [renderModal,setRenderModal]=useState(false);
  
  const handleAddBtn = () => {
    setRenderModal((prev) => !prev);
  };

  const handleSearchClick = () => {
    navigate('/products');
  };

  return (
    <Container>
      <h1 className="brand">Super <span className='brand-title'>Products</span></h1>
      <Links>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <button className='add-btn' onClick={handleAddBtn}>Add Product</button>
      </Links>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Input 
          placeholder="Search products" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '200px' }}
        />
        <Button type="primary" onClick={handleSearchClick}>
          Search
        </Button>
      </div>
      {renderModal && <AddProduct/>}
    </Container>
  );
};

export default Navbar;
