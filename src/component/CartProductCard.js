import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { cartActions } from "../action/cartAction";
import { currencyFormat } from "../utils/number";

const CartProductCard = ({ item }) => {
    const dispatch = useDispatch();

    const handleQtyChange = (id, value) => {
        dispatch(cartActions.updateQty(id, value));
    };

    const deleteCart = (id) => {
        dispatch(cartActions.deleteCartItem(id));
    };

    return (
        <div className="product-card-cart">
            <Row>
                <Col md={2} xs={12}>
                    <img
                        src={item.productId.image}
                        width={112}
                        alt={item.productId.name}
                    />
                </Col>
                <Col md={10} xs={12}>
                    <div className="display-flex space-between">
                        <h5>{item.productId.name}</h5>
                        <button className="trash-button" onClick={deleteCart}>
                            <FontAwesomeIcon icon={faTrash} width={24} />
                        </button>
                    </div>
                    <div>
                        <strong>
                            ₩ {currencyFormat(item.productId.price)}
                        </strong>
                    </div>
                    <div>Size: {item.size}</div>
                    <div>
                        Quantity:
                        <input
                            type="number"
                            min="1"
                            max="10"
                            onChange={(event) =>
                                handleQtyChange(item._id, event.target.value)
                            }
                            required
                            defaultValue={item.qty}
                            className="qty-input"
                        />
                    </div>
                    <div>
                        Total: ₩
                        {currencyFormat(item.productId.price * item.qty)}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CartProductCard;
