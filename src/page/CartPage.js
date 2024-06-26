import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../action/cartAction";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";

const CartPage = () => {
    const dispatch = useDispatch();
    const cartListFromState = useSelector((state) => state.cart.cartList);
    const [cartList, setCartList] = useState([]);

    useEffect(() => {
        dispatch(cartActions.getCartList());
    }, [dispatch]);

    useEffect(() => {
        setCartList(cartListFromState);
    }, [cartListFromState]);

    const handleQtyChange = (id, quantity) => {
        const updatedCartList = cartList.map((item) =>
            item._id === id ? { ...item, qty: quantity } : item
        );
        setCartList(updatedCartList);
        dispatch(cartActions.updateQty(id, quantity));
    };

    const handleReload = async () => {
        await dispatch(cartActions.getCartList());
        setCartList(cartListFromState);
    };

    return (
        <Container>
            <Row>
                <Col xs={12} md={7}>
                    {cartList.length > 0 ? (
                        cartList.map((item) => (
                            <CartProductCard
                                item={item}
                                key={item._id}
                                onQtyChange={handleQtyChange}
                                onReload={handleReload}
                            />
                        ))
                    ) : (
                        <div className="text-align-center empty-bag">
                            <h2>카트가 비어있습니다.</h2>
                            <div>상품을 담아주세요!</div>
                        </div>
                    )}
                </Col>
                <Col xs={12} md={5}>
                    <OrderReceipt cartList={cartList} onReload={handleReload} />
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;
