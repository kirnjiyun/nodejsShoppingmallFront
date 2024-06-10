import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const PaymentForm = ({
    handleInputFocus,
    cardValue = { cvc: "", expiry: "", focus: "", name: "", number: "" },
    handlePaymentInfoChange,
}) => {
    return (
        <Form>
            <Row className="display-flex">
                <Col md={6} xs={12}>
                    <Cards
                        cvc={cardValue.cvc}
                        expiry={cardValue.expiry}
                        focused={cardValue.focus}
                        name={cardValue.name}
                        number={cardValue.number}
                    />
                </Col>
                <Col md={6} xs={12}>
                    <div className="form-area">
                        <Form.Group controlId="formCardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                                type="tel"
                                name="number"
                                placeholder="Card Number"
                                onChange={handlePaymentInfoChange}
                                onFocus={handleInputFocus}
                                required
                                maxLength={16}
                                minLength={16}
                                value={cardValue.number}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCardName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handlePaymentInfoChange}
                                onFocus={handleInputFocus}
                                required
                                value={cardValue.name}
                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group controlId="formCardExpiry">
                                    <Form.Label>Expiry</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        onChange={handlePaymentInfoChange}
                                        onFocus={handleInputFocus}
                                        required
                                        value={cardValue.expiry}
                                        maxLength={5}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formCardCVC">
                                    <Form.Label>CVC</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cvc"
                                        placeholder="CVC"
                                        onChange={handlePaymentInfoChange}
                                        onFocus={handleInputFocus}
                                        required
                                        maxLength={3}
                                        value={cardValue.cvc}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Form>
    );
};

export default PaymentForm;
