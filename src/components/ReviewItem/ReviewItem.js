import React from "react";

const ReviewItem = (props) => {
    const { name, quantity, img, key } = props.product;
    const removeProduct = props.removeProduct;

    const reviewStyle = {
        border: "1px solid gray",
        padding: "5px",
    };
    return (
        <div style={reviewStyle}>
            <img src={img} alt="" />
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <button className="main-button" onClick={() => removeProduct(key)}>
                Remove
            </button>
        </div>
    );
};

export default ReviewItem;
