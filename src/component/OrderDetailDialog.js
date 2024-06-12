import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Col, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";

import "../style/adminOrder.style.css";
import { ORDER_STATUS } from "../constants/order.constants";
import { orderActions } from "../action/orderAction";
import { currencyFormat } from "../utils/number";

const OrderDetailDialog = ({ show, handleClose, order, editable = true }) => {
    const [orderStatus, setOrderStatus] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (order) {
            console.log("Selected Order in Dialog:", order);
            setOrderStatus(order.status);
        }
    }, [order]);

    const handleStatusChange = (event) => {
        setOrderStatus(event.target.value);
    };

    const submitStatus = (event) => {
        event.preventDefault();
        if (order) {
            dispatch(orderActions.updateOrder(order._id, orderStatus));
        }
        handleClose();
    };

    if (!order) {
        return null;
    }

    const { orderNum, createdAt, userId, shipTo, contact, items = [] } = order;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Order Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>예약번호: {orderNum}</p>
                <p>주문날짜: {createdAt?.slice(0, 10)}</p>
                {editable && <p>이메일: {userId?.email}</p>}
                <p>
                    주소:
                    {shipTo?.address + " " + shipTo?.city}
                </p>
                <p>
                    연락처:
                    {`${contact?.firstName} ${contact?.lastName} ${contact?.contact}`}
                </p>
                <p>주문내역</p>
                <div className="overflow-x">
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Unit Price</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 &&
                                items.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item._id}</td>
                                        <td>{item.productId?.name}</td>
                                        <td>{currencyFormat(item.price)}</td>
                                        <td>{item.qty}</td>
                                        <td>
                                            {currencyFormat(
                                                item.price * item.qty
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            <tr>
                                <td colSpan={4}>총계:</td>
                                <td>
                                    {currencyFormat(
                                        items.reduce(
                                            (total, item) =>
                                                total + item.price * item.qty,
                                            0
                                        )
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                {editable && (
                    <Form onSubmit={submitStatus}>
                        <Form.Group as={Col} controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={orderStatus}
                                onChange={handleStatusChange}
                            >
                                {ORDER_STATUS.map((item, idx) => (
                                    <option
                                        key={idx}
                                        value={item.toLowerCase()}
                                    >
                                        {item}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <div className="order-button-area">
                            <Button
                                variant="light"
                                onClick={handleClose}
                                className="order-button"
                            >
                                닫기
                            </Button>
                            <Button type="submit">저장</Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default OrderDetailDialog;
