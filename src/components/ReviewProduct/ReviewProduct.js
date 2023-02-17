import React from 'react';
import { Link } from 'react-router-dom';

const ReviewProduct = (props) => {
    const {name,seller,price,stock,quantity,key,img} = props.product;
    return (
        <div className='product'>
        <div className='product-image'>
               <img src={img} alt="" />
        </div>
        <div className="product-details">
              <h4> <Link to={`/products/${key}`}> {name}</Link></h4>
                <p><small>by:{seller}</small></p>
                <p><small>Quantity:{quantity}</small></p>
                <h4>${price}</h4>
                <p><small>only {stock} left in stock - order soon</small></p>
                {props.children}
        </div>
        
    </div>
    );
};

export default ReviewProduct;