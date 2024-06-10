import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { cartActions } from "../../src/action/cartAction";
import { currencyFormat } from "../utils/number";

const CartProductCard = ({ item, onQtyChange, onReload }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = React.useState(item.qty);

    const handleQtyChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value);
    };

    const handleQtySubmit = async () => {
        onQtyChange(item._id, quantity);
        await onReload();
    };

    const deleteCart = (id) => {
        dispatch(cartActions.deleteCartItem(id));
    };

    return (
        <div className="product-card-cart">
            <Row>
                <Col md={2} xs={12}>
                    <img
                        src={item.productId?.image}
                        width={112}
                        alt={item.productId?.name}
                    />
                </Col>
                <Col md={10} xs={12}>
                    <div className="display-flex space-between">
                        <h5>{item.productId?.name}</h5>
                        <button
                            className="trash-button"
                            onClick={() => deleteCart(item._id)}
                        >
                            <FontAwesomeIcon icon={faTrash} width={24} />
                        </button>
                    </div>
                    <div>
                        <strong>
                            ₩ {currencyFormat(item.productId?.price)}
                        </strong>
                    </div>
                    <div>Size: {item.size}</div>
                    <div>
                        Quantity:
                        <select
                            value={quantity}
                            onChange={handleQtyChange}
                            className="qty-select"
                        >
                            {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleQtySubmit}>확인</button>
                    </div>
                    <div>
                        Total: ₩
                        {currencyFormat(item.productId?.price * quantity)}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CartProductCard;
