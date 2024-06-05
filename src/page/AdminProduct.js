import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import NewItemDialog from "../component/NewItemDialog";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductTable from "../component/ProductTable";
import Pagination from "../component/Pagination";

const AdminProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.productList);
    const totalPageNum = useSelector((state) => state.product.totalPageNum); // 변수 이름 변경
    const [query, setQuery] = useSearchParams();
    const [showDialog, setShowDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState({
        page: query.get("page") || 1,
        name: query.get("name") || "",
    });

    const [mode, setMode] = useState("new");
    const tableHeader = [
        "#",
        "Sku",
        "Name",
        "Price",
        "Stock",
        "Image",
        "Status",
        "",
    ];

    // 제품 목록을 가져오는 useEffect
    useEffect(() => {
        console.log("Fetching products with query:", searchQuery);
        dispatch(productActions.getProductList({ ...searchQuery }));
    }, [dispatch, searchQuery]);

    // URL 파라미터와 searchQuery를 동기화하는 useEffect
    useEffect(() => {
        console.log("Syncing URL with searchQuery:", searchQuery);
        const params = new URLSearchParams(searchQuery);
        navigate("?" + params.toString());
    }, [searchQuery, navigate]);

    // searchQuery와 URLSearchParams를 동기화하는 useEffect
    useEffect(() => {
        console.log("Setting query params:", searchQuery);
        setQuery(searchQuery);
    }, [searchQuery]);

    const deleteItem = (id) => {
        // 아이템 삭제하기
    };

    const openEditForm = (product) => {
        // edit 모드로 설정하고 아이템 수정 다이얼로그 열기
    };

    const handleClickNewItem = () => {
        // new 모드로 설정하고 다이얼로그 열기
        setMode("new");
        setShowDialog(true);
    };

    const handlePageClick = ({ selected }) => {
        setSearchQuery((prev) => ({
            ...prev,
            page: selected + 1,
        }));
        console.log("selected page", selected + 1);
    };

    return (
        <div className="locate-center">
            <Container>
                <div className="mt-2">
                    <SearchBox
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder="제품 이름으로 검색"
                        field="name"
                    />
                </div>
                <Button className="mt-2 mb-2" onClick={handleClickNewItem}>
                    Add New Item +
                </Button>

                <ProductTable
                    header={tableHeader}
                    data={productList}
                    deleteItem={deleteItem}
                    openEditForm={openEditForm}
                />
                <Pagination
                    handlePageClick={handlePageClick}
                    forcePage={parseInt(searchQuery.page) - 1}
                    pageCount={totalPageNum}
                />
            </Container>

            <NewItemDialog
                mode={mode}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </div>
    );
};

export default AdminProduct;
