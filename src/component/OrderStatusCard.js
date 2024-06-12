import React, { useState } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";
import OrderDetailDialog from "./OrderDetailDialog";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";

const OrderStatusCard = ({ orderItem }) => {
    const [showDialog, setShowDialog] = useState(false);
    const selectedOrder = useSelector((state) => state.order.selectedOrder);
    const dispatch = useDispatch();

    const totalPrice = orderItem.items.reduce((total, item) => {
        const price = item.price || 0;
        return total + price * item.qty;
    }, 0);

    const handleCardClick = () => {
        console.log("Selected order:", orderItem);
        dispatch(orderActions.selectOrder(orderItem));
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
        dispatch(orderActions.selectOrder(null));
    };

    return (
        <div>
            <Row className="status-card" onClick={handleCardClick}>
                <Col xs={2}>
                    <img
                        src={orderItem.items[0]?.productId?.image}
                        alt={orderItem.items[0]?.productId?.image}
                        height={96}
                    />
                </Col>
                <Col xs={8} className="order-info">
                    <div>
                        <strong>주문번호: {orderItem.orderNum}</strong>
                    </div>

                    <div className="text-12">
                        {orderItem.createdAt.slice(0, 10)}
                    </div>

                    <div>
                        {orderItem.items[0].productId?.name}
                        {orderItem.items.length > 1 &&
                            ` 외 ${orderItem.items.length - 1}개`}
                    </div>
                    <div>₩ {currencyFormat(totalPrice)}</div>
                </Col>
                <Col md={2} className="vertical-middle">
                    <div className="text-align-center text-12">주문상태</div>
                    <Badge bg={badgeBg[orderItem.status]}>
                        {orderItem.status}
                    </Badge>
                </Col>
            </Row>
            <OrderDetailDialog
                show={showDialog}
                handleClose={handleCloseDialog}
            />
        </div>
    );
};

export default OrderStatusCard;
