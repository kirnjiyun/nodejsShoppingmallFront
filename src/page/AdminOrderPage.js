import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SearchBox from "../component/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderDetailDialog from "../component/OrderDetailDialog";
import OrderTable from "../component/OrderTable";
import * as types from "../constants/order.constants";
import ReactPaginate from "react-paginate";
import { useSearchParams, useNavigate } from "react-router-dom";
import { commonUiActions } from "../action/commonUiAction";

const AdminOrderPage = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useSearchParams();
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.order.orderList);
    const [searchQuery, setSearchQuery] = useState({
        page: query.get("page") || 1,
        ordernum: query.get("ordernum") || "",
    });
    const error = useSelector((state) => state.order.error);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const totalPageNum = useSelector((state) => state.order.totalPageNum);
    const tableHeader = [
        "#",
        "주문 번호",
        "주문 일자",
        "구매자",
        "주문 상품",
        "주소",
        "총계",
        "진행 상태",
    ];

    useEffect(() => {
        dispatch(orderActions.getOrderList({ ...searchQuery }));
    }, [query]);

    useEffect(() => {
        if (searchQuery.ordernum === "") {
            delete searchQuery.ordernum;
        }
        const params = new URLSearchParams(searchQuery);
        const queryString = params.toString();

        navigate("?" + queryString);
    }, [searchQuery]);

    const openEditForm = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handlePageClick = ({ selected }) => {
        setSearchQuery({ ...searchQuery, page: selected + 1 });
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="locate-center">
            <Container>
                <div className="mt-2 display-center mb-2">
                    <SearchBox
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder="주문번호
                        "
                        field="ordernum"
                    />
                </div>

                <OrderTable
                    header={tableHeader}
                    data={orderList}
                    openEditForm={openEditForm}
                />
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPageNum}
                    forcePage={searchQuery.page - 1}
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

            {open && (
                <OrderDetailDialog
                    show={open}
                    handleClose={handleClose}
                    order={selectedOrder}
                />
            )}
        </div>
    );
};

export default AdminOrderPage;
