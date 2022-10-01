import React from "react";
import { Link } from "react-router-dom";

const Cart = (props) => {
    const cart = props.cartProduct;
    var total = 0;

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    return (
        <div className="cart-container">
            <h3>cart container</h3>
            <h4>Order summary: {cart.length}</h4>
            <h4>Total price: {total.toFixed(2)}</h4>
            <br />
        
            {props.children}
        </div>
    );
};

export default Cart;
