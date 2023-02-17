import React, { useEffect, useState } from "react";
import "./Shop.scss";
import fakeProducts from "../../fakeData/products.json";
import Product from "../Product/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";

const Shop = () => {
  for (let i = fakeProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fakeProducts[i], fakeProducts[j]] = [fakeProducts[j], fakeProducts[i]];
  }

  const firstTenProducts = fakeProducts.slice(0, 10);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(firstTenProducts);
  }, []);

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart'))||[]);
  
  // add a product to the cart
  const addToCart = (product) => {
    // check if the product is already in the cart
    const existingProduct = cart.find((p) => p.key === product.key);
    if (existingProduct) {
      // if the product is already in the cart, increase the quantity
      setCart(
        cart.map((p) =>
          p.key === product.key ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      // if the product is not in the cart, add it with a quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
  };

  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart));
  })

  return (
    <div className="shop-page">
      <div className="product-section">
        {products.map((product) => (
          <Product product={product} key={product.key}>
            {" "}
            <button
              className="add-to-cart-button"
              onClick={() => addToCart(product)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> &nbsp; add to cart{" "}
            </button>
          </Product>
        ))}
      </div>

      <div className="cart-section">
        <Cart cart={cart}><Link to='/review-order'><button className="review-order-btn">Review Order</button></Link></Cart>
      </div>
    </div>
  );
};

export default Shop;
