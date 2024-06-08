import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import ProductCard from "../component/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ProductAll = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.productList);
    const loading = useSelector((state) => state.product.loading);
    const query = useQuery();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState(query.get("name") || "");

    useEffect(() => {
        dispatch(productActions.getProductListAll());
    }, [dispatch]);

    useEffect(() => {
        const name = query.get("name") || "";
        if (name !== searchQuery) {
            setSearchQuery(name);
        }
    }, [query]);

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchQuery) {
            params.set("name", searchQuery);
        } else {
            params.delete("name");
        }
        navigate({ search: params.toString() }, { replace: true });
    }, [searchQuery, navigate]);

    if (loading) {
        return (
            <Container>
                <Row>
                    <Col>
                        <p>로딩 중...</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!Array.isArray(products)) {
        return (
            <Container>
                <Row>
                    <Col>
                        <p>제품 목록을 불러오는 중 오류가 발생했습니다.</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Col key={product._id} lg={3} md={4} sm={12}>
                            <ProductCard product={product} />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>검색 결과와 일치하는 제품이 없습니다</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default ProductAll;
