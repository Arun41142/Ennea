import React from 'react';
import '../styles/HomePage.css';
import { featureProducts } from './featureProducts';

const HomePage = () => {
  return (
    <>

      <div className="container">
        <div className='home-container'>
          <img src="/shoping_Cart.png" alt="" />
        </div>
        <div>
          <h1>Delivering your essentials with utmost care.</h1>
        </div>
      </div>

      <div className="feature-main-cont" style={{ padding: '5%', backgroundColor: '#081b29', color: 'white' }}>
        <h1 style={{ textAlign: 'center' }}>Our Products</h1>
        <div className="feature-container">
          {featureProducts.map((category) => (
            <div key={category.id} className="category-card">
              <img src={category.image} alt={category.name} className="category-image" />
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>
      </div>


      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Feel free to reach out with any questions or feedback.</p>
        <form className="contact-form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="4" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </>
  );
};

export default HomePage;
