import React, { useEffect, useState } from 'react';
import happyImage from '../../images/giphy.gif';
import './OrderPage.scss';

const OrderPage = () => {
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart));
    })
    return (
        <div className='order-page'>
            <img src={happyImage} alt="" />
        </div>
    );
};

export default OrderPage;