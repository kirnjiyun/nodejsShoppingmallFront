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
    const query = useQuery();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState({
        name: query.get("name") || "",
    });

    useEffect(() => {
        dispatch(productActions.getProductListAll());
    }, [dispatch]);

    useEffect(() => {
        const params = new URLSearchParams(searchQuery);
        navigate({ search: params.toString() }, { replace: true });
    }, [searchQuery, navigate]);

    useEffect(() => {
        const name = query.get("name") || "";
        if (name !== searchQuery.name) {
            setSearchQuery({ name });
        }
    }, [query]);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.name.toLowerCase())
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
