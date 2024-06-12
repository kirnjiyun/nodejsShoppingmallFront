import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const OrderStatusCard = ({ orderItem }) => {
    const totalPrice = orderItem.items.reduce((total, item) => {
        const price = item.price || 0; // item 객체에서 price 가져오기
        console.log("Item:", item);
        console.log("Product ID:", item.productId);
        console.log("Price:", price, "Quantity:", item.qty);
        return total + price * item.qty;
    }, 0);

    return (
        <div>
            <Row className="status-card">
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
        </div>
    );
};

export default OrderStatusCard;
