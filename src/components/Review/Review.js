import React, { useContext } from "react";
import { useEffect, useState } from "react";
import {
    getDatabaseCart,
    processOrder,
    removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import fakeData from "./../../fakeData/index";
import "./Review.css";
import {  useNavigate } from 'react-router-dom';
import { UserContext } from "../../App";


const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);

    const removeProduct = (productKey) => {
        const newCart = cart.filter((pd) => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };




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


    

    const navigate = useNavigate();
    const handleProceedCheckOut = () => {

        if(loggedInUser.email){
            navigate("/shipment")
        }else{
            navigate("/login")
        }

        

        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
    };

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
                    <button onClick={handleProceedCheckOut} className="main-button">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
