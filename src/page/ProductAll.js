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
    const navigate = useNavigate();
    const query = useQuery();

    const [searchQuery, setSearchQuery] = useState({
        name: query.get("name") || "",
    });

    useEffect(() => {
        dispatch(productActions.getProductListAll({ ...searchQuery }));
    }, [dispatch, searchQuery]);

    useEffect(() => {
        const params = new URLSearchParams(searchQuery);
        navigate({ search: params.toString() }, { replace: true });
    }, [searchQuery, navigate]);

    return (
        <Container>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} lg={3} md={4} sm={12}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductAll;
