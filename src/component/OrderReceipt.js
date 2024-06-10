import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

const OrderReceipt = ({ cartList, onReload }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const newTotalPrice = cartList.reduce((total, product) => {
            return total + (product.productId?.price || 0) * product.qty;
        }, 0);
        setTotalPrice(newTotalPrice);
    }, [cartList]);

    const handleReload = async () => {
        if (onReload) {
            setLoading(true);
            await onReload();
            setLoading(false);
        }
    };

    return (
        <div className="receipt-container">
            <h3 className="receipt-title">
                주문 내역{" "}
                {onReload && (
                    <Button
                        variant="outline-secondary"
                        className="reload-button"
                        onClick={handleReload}
                        disabled={loading}
                    >
                        {loading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            <FontAwesomeIcon icon={faRedo} />
                        )}
                        {loading ? " 로딩 중..." : " 재로딩"}
                    </Button>
                )}
            </h3>
            <ul className="receipt-list">
                {cartList.map((product) => (
                    <li key={product.productId?.id}>
                        <div className="display-flex space-between">
                            <div>{product.productId?.name}</div>
                            <div>{product.qty}</div>
                            <div>
                                ₩ {currencyFormat(product.productId?.price)}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="display-flex space-between receipt-title">
                <div>
                    <strong>Total:</strong>
                </div>
                <div>
                    <strong>₩ {currencyFormat(totalPrice)}</strong>
                </div>
            </div>

            {location.pathname.includes("/cart") && (
                <Button
                    variant="dark"
                    className="payment-button"
                    onClick={() => navigate("/payment")}
                >
                    결제 진행하기
                </Button>
            )}
            {onReload && (
                <div>
                    가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및
                    배송료는 확인되지 않습니다.
                    <div>
                        30일의 반품 가능 기간, 반품 수수료 및 미수취시 발생하는
                        추가 배송 요금 읽어보기 반품 및 환불
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderReceipt;
