import React from "react";
import "../style/productCard.style.css";
import { currencyFormat } from "../utils/number";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const showProduct = (id) => {
        navigate(`/product/${id}`);
        console.log("Product ID:", id);
    };

    return (
        <div className="card" onClick={() => showProduct(product._id)}>
            <img src={product.image} alt={product.name} />
            <div className="productInfo">
                <div className="productName">{product.name}</div>
                <div className="productPrice">
                    ₩ {currencyFormat(product.price)}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
