import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../style/paymentPage.style.css";

const OrderCompletePage = () => {
    const order = useSelector((state) => state.order || {});
    const { orderNum, loading, error } = order;
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!orderNum) {
        return (
            <div>
                <h1>주문 실패</h1>
                <div>
                    메인페이지로 돌아가세요{" "}
                    <Link to="/">메인페이지로 돌아가기</Link>
                </div>
            </div>
        );
    }

    return (
        <Container className="confirmation-page">
            <img
                src="/image/greenCheck.png"
                width={100}
                className="check-image"
                alt="greenCheck.png"
            />
            <h2>주문이 완료되었습니다!</h2>
            <div>주문번호: {orderNum}</div>
            <div>
                주문 확인은 내 주문 메뉴에서 확인해주세요
                <div className="text-align-center">
                    <Link to="/account/purchase">내 주문 바로가기</Link>
                </div>
            </div>
        </Container>
    );
};

export default OrderCompletePage;
