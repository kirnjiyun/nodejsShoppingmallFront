import React from "react";
import ReactPaginate from "react-paginate";
import "../style/pagination.style.css";

const Pagination = ({ pageCount, handlePageClick, forcePage }) => {
    return (
        <ReactPaginate
            previousLabel="< previous"
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            forcePage={forcePage}
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
    );
};

export default Pagination;
