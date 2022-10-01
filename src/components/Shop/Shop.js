import React, { useState } from "react";
import fakeData from "../../fakeData";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import {
    addToDatabaseCart,
    getDatabaseCart,
} from "../../utilities/databaseManager";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
    const element = <FontAwesomeIcon icon={faShoppingCart} />;

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);

        const previousCart = productKey.map((key) => {
            const product = fakeData.find((pd) => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(previousCart);
    }, []);

    const handleAddProduct = (product) => {
        let newCart;
        let count = 1;
        const sameProduct = cart.find((pd) => pd.key === product.key);

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter((pd) => pd.key !== product.key);
            newCart = [...others, product];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    };

    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);

    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {products.map((pd) => (
                        <Product
                            key={pd.key}
                            showAddToCart={true}
                            product={pd}
                            handleAddProduct={handleAddProduct}></Product>
                    ))}
                </ul>
            </div>
            <div className="Cart">
                
                <Cart cartProduct={cart}>
                    <Link to="/review">
                        <button className="main-button">
                            {" "}
                            {element} Review order
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
