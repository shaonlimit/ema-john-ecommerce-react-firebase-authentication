import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './Product.scss';




const Product = (props) => {
    
    const {name,img,seller,stock,price,key} = props.product;

  
    
    
    return (
        <div className='product'>
            <div className='product-image'>
                   <img src={img} alt="" />
            </div>
            <div className="product-details">
                  <h4> <Link to={`/products/${key}`}> {name}</Link></h4>
                    <p><small>by:{seller}</small></p>
                    <h4>${price}</h4>
                    <p><small>only {stock} left in stock - order soon</small></p>
                    {props.children}
            </div>
            
        </div>
    );
};

export default Product;