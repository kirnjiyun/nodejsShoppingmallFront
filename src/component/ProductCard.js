import React from "react";
import "../style/productCard.style.css";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ product }) => {
    const showProduct = (id) => {
        console.log("Product ID:", id);
    };

    return (
        <div className="card" onClick={() => showProduct(product._id)}>
            <img src={product.image} alt={product.name} />
            <div className="productName">{product.name}</div>
            <div className="productPrice">
                ₩ {currencyFormat(product.price)}
            </div>
        </div>
    );
};

export default ProductCard;
