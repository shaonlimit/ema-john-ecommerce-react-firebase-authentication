import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';

import ReviewProduct from '../ReviewProduct/ReviewProduct';
import './ReviewOrder.scss';

const ReviewOrder = ({ index }) => {

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);



  function handleRemove() {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  const emptyStyle = {
    'width': '100%',
    'text-align': 'center',

  }


  return (
    <div className='review-order'>
      {
        cart.length === 0 && <h4 style={emptyStyle}>Please add at least one product to buy....🛒🛒🛒</h4>
      }
      <div className="product-section" >
        {
          cart.length !== 0 && cart.map(product => <ReviewProduct product={product} key={product.key}><button className='remove-product-button' onClick={handleRemove}>Remove Product</button></ReviewProduct>)
        }
      </div>
      <div className="cart-section" >

        {
          cart.length !== 0 && <Cart cart={cart}><Link to='/shipment'><button className='buy-product-btn'>Proceed Checkout</button></Link></Cart>
        }

      </div>
    </div>
  );
};

export default ReviewOrder;