import React from "react";
import { useEffect, useState } from "react";
import {
    getDatabaseCart,
    removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import fakeData from "./../../fakeData/index";
import "./Review.css";

const Review = () => {
    const removeProduct = (productKey) => {
        const newCart = cart.filter((pd) => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map((key) => {
            const product = fakeData.find((pd) => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });

        setCart(cartProducts);
    }, []);

    return (
        <div className="twin-container">
            <div className="product-container">
                <h3>This is a review page</h3>
                <h2>Total order : {cart.length}</h2>

                {cart.map((pd) => (
                    <ReviewItem
                        product={pd}
                        removeProduct={removeProduct}></ReviewItem>
                ))}
            </div>

            <div className="cart-container">
                <Cart cartProduct={cart}>
                    <button className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
