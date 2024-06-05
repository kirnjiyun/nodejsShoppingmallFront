import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import NewItemDialog from "../component/NewItemDialog";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProductTable from "../component/ProductTable";

const AdminProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.productList);
    const totalPages = useSelector((state) => state.product.totalPages);
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
        if (
            query.get("page") !== searchQuery.page.toString() ||
            query.get("name") !== searchQuery.name
        ) {
            setQuery(searchQuery);
        }
    }, [searchQuery, query, setQuery]);

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
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    forcePage={parseInt(searchQuery.page) - 1}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    className="display-center list-style-none"
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
