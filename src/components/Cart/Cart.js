import React from "react";

import "./Cart.scss";

const Cart = (props) => {
  const cart = props.cart;
  const productTotal = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const productQuantity = cart.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const calculateTax = (total) => {
    return total * 0.1; // 10% tax
  };

  const calculateShipping = (total) => {
    if (total === 0) {
      return 0;
    } else if (total < 100) {
      return 5;
    } else if (total < 300) {
      return 10;
    } else {
      return 15;
    }
  };

  const shipping = calculateShipping(productTotal);
  const tax = calculateTax(productTotal);
  const total = productTotal + shipping + tax;

  return (
    <div className="cart">
      <h4>Order Summary</h4>

      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr>
            <td>Items Orderd: </td>
            <td>{cart.length}</td>
          </tr>
          <tr>
            <td>Quantity: </td>
            <td>{productQuantity}</td>
          </tr>
          <tr>
            <td>Items:</td>
            <td>${productTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Shipping:</td>
            <td>${shipping.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td>${tax.toFixed(2)}</td>
          </tr>
          <tr className="total">
            <td>Total:</td>
            <td>${total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      {props.children}
    </div>
  );
};

export default Cart;
