import React from 'react';
import Product from '../Product/Product';
import fakeProducts from '../../fakeData/products.json';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productKey } = useParams();
    const singleProduct = fakeProducts.find(product =>product.key===productKey); 
    return (
        <div className='product-details'>
            <Product product={singleProduct}></Product>
        </div>
    );
};

export default ProductDetails;