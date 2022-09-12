import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cartProduct=props.cartProduct;
    var totalPrice=0;

    for(let i=0;i<cartProduct.length;i++){
        totalPrice+=cartProduct[i].price;
    }
    return (
        <div className="cart-container">
                <h3>cart container</h3>
                <h4>order summary: {cartProduct.length}</h4>
                <h4>Total price: {totalPrice}</h4>
                <br />
                

                <Link to='/review'><button className='main-button'>Review order</button></Link>
            </div>
    );
};

export default Cart;