import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { commonUiActions } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";

const ProductDetail = () => {
    const dispatch = useDispatch();
    const selectedProduct = useSelector(
        (state) => state.product.selectedProduct?.data
    );
    const loading = useSelector((state) => state.product.loading);
    const error = useSelector((state) => state.product.error);
    const { user } = useSelector((state) => state.user);
    const [size, setSize] = useState("");
    const { id } = useParams();
    const [sizeError, setSizeError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(productActions.getProductDetail(id));
    }, [dispatch, id]);

    const selectSize = (value) => {
        setSize(value);
        setSizeError(false);
    };

    const addItemToCart = () => {
        if (!size) {
            setSizeError(true);
            return;
        }
        if (!user) navigate("/login");
        dispatch(cartActions.addToCart({ id, size }));
    };

    if (loading) {
        return (
            <div className="loader-container">
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                    ]}
                />
            </div>
        );
    }

    if (error) {
        return (
            <Container>
                <Row>
                    <Col>
                        <p>
                            제품 정보를 불러오는 중 오류가 발생했습니다: {error}
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!selectedProduct) {
        return (
            <Container>
                <Row>
                    <Col>
                        <p>제품 정보를 불러오는 중...</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="product-detail-card">
            <Row>
                <Col sm={6}>
                    <img
                        src={selectedProduct.image}
                        className="w-100"
                        alt={selectedProduct.name}
                    />
                </Col>
                <Col className="product-info-area" sm={6}>
                    <div className="product-info">{selectedProduct.name}</div>
                    <div className="product-info">
                        ₩ {currencyFormat(selectedProduct.price)}
                    </div>
                    <div className="product-info">
                        {selectedProduct.description}
                    </div>

                    <Dropdown
                        className="drop-down size-drop-down"
                        title={size}
                        align="start"
                        onSelect={(value) => selectSize(value)}
                    >
                        <Dropdown.Toggle
                            className="size-drop-down"
                            variant={
                                sizeError ? "outline-danger" : "outline-dark"
                            }
                            id="dropdown-basic"
                            align="start"
                        >
                            {size === "" ? "사이즈 선택" : size.toUpperCase()}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="size-drop-down">
                            {selectedProduct.stock &&
                                Object.keys(selectedProduct.stock).length > 0 &&
                                Object.keys(selectedProduct.stock).map((item) =>
                                    selectedProduct.stock[item] > 0 ? (
                                        <Dropdown.Item
                                            key={item}
                                            eventKey={item}
                                        >
                                            {item.toUpperCase()}
                                        </Dropdown.Item>
                                    ) : (
                                        <Dropdown.Item
                                            key={item}
                                            eventKey={item}
                                            disabled
                                        >
                                            {item.toUpperCase()}
                                        </Dropdown.Item>
                                    )
                                )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="warning-message">
                        {sizeError && "사이즈를 선택해주세요."}
                    </div>
                    <Button
                        variant="dark"
                        className="add-button"
                        onClick={addItemToCart}
                    >
                        추가
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
