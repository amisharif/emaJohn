import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {

    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }

    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10)


    return (
        <div className='shop-container'>

            <div className="product-container">
                <ul>
                    {
                        products.map(pd => <Product
                            showAddToCart={true}
                            product={pd}
                            handleAddProduct={handleAddProduct}
                        ></Product>)
                    }
                </ul>
            </div>
            <div className="Cart">
                <Cart cartProduct={cart}></Cart>
            </div>
        </div>
    );

};


export default Shop;