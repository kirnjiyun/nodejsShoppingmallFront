import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import NewItemDialog from "../component/NewItemDialog";
import * as types from "../constants/product.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { commonUiActions } from "../action/commonUiAction";
import ProductTable from "../component/ProductTable";

const AdminProduct = () => {
    const navigate = useNavigate();
    const productList = useSelector((state) => state.product.productList);
    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();
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

    //상품리스트 가져오기 (url쿼리 맞춰서)
    useEffect(() => {
        console.log("Dispatching getProductList");
        dispatch(productActions.getProductList(searchQuery));
    }, [searchQuery, dispatch]);

    useEffect(() => {
        setQuery({ ...searchQuery });
    }, [searchQuery, setQuery]);

    const deleteItem = (id) => {
        //아이템 삭제하가ㅣ
    };

    const openEditForm = (product) => {
        //edit모드로 설정하고
        // 아이템 수정다이얼로그 열어주기
    };

    const handleClickNewItem = () => {
        //new 모드로 설정하고
        setMode("new");
        // 다이얼로그 열어주기
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
                    pageCount={100}
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
