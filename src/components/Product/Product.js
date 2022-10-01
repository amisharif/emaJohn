import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
    const handleAddProduct = props.handleAddProduct;
    const { name, price, img, seller, stock, key } = props.product;

    const element = <FontAwesomeIcon icon={faShoppingCart} />;

    return (
        <div className="singleProduct">
            <div className="product-image">
                <img src={img} alt="" />
            </div>
            <div className="productDesc">
                <h3 className="product-name">
                    <Link to={"/product/" + key}>{name}</Link>
                </h3>
                <h4>
                    <small> by: {seller}</small>
                </h4>
                <h4>
                    <span>$ </span>
                    {price}
                </h4>

                {props.showAddToCart && (
                    <button
                        className="main-button"
                        onClick={() => handleAddProduct(props.product)}>
                        {element} Add to cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default Product;
