import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
    faBars,
    faBox,
    faSearch,
    faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../action/userAction";

const Navbar = ({ user }) => {
    const dispatch = useDispatch();
    const { cartItemCount } = useSelector((state) => state.cart);
    const isMobile = window.navigator.userAgent.indexOf("Mobile") !== -1;
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [width, setWidth] = useState(0);
    const navigate = useNavigate();

    const menuList = [
        "여성",
        "Divided",
        "남성",
        "신생아/유아",
        "아동",
        "H&M HOME",
        "Sale",
        "지속가능성",
    ];

    const onCheckEnter = (event) => {
        if (event.key === "Enter") {
            if (searchTerm.trim() === "") {
                return navigate("/");
            }
            navigate(`/products?name=${searchTerm}`);
        }
    };

    const logout = () => {
        dispatch(userActions.logout());
    };

    return (
        <div>
            {showSearchBox && (
                <div className="display-space-between mobile-search-box w-100">
                    <div className="search display-space-between w-100">
                        <div>
                            <FontAwesomeIcon
                                className="search-icon"
                                icon={faSearch}
                            />
                            <input
                                type="text"
                                placeholder="제품검색"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={onCheckEnter}
                            />
                        </div>
                        <button
                            className="closebtn"
                            onClick={() => setShowSearchBox(false)}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
            <div className="side-menu" style={{ width: width }}>
                <button className="closebtn" onClick={() => setWidth(0)}>
                    &times;
                </button>

                <div className="side-menu-list" id="menu-list">
                    {menuList.map((menu, index) => (
                        <button key={index}>{menu}</button>
                    ))}
                </div>
            </div>
            {user && user.level === "admin" && (
                <Link to="/admin/product?page=1" className="link-area">
                    Admin page
                </Link>
            )}
            <div className="nav-header">
                <div className="burger-menu hide">
                    <FontAwesomeIcon
                        icon={faBars}
                        onClick={() => setWidth(250)}
                    />
                </div>

                <div>
                    <div className="display-flex">
                        {user ? (
                            <div onClick={logout} className="nav-icon">
                                <FontAwesomeIcon icon={faUser} />
                                {!isMobile && (
                                    <span style={{ cursor: "pointer" }}>
                                        로그아웃
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div
                                onClick={() => navigate("/login")}
                                className="nav-icon"
                            >
                                <FontAwesomeIcon icon={faUser} />
                                {!isMobile && (
                                    <span style={{ cursor: "pointer" }}>
                                        로그인
                                    </span>
                                )}
                            </div>
                        )}
                        <div
                            onClick={() => navigate("/cart")}
                            className="nav-icon"
                        >
                            <FontAwesomeIcon icon={faShoppingBag} />
                            {!isMobile && (
                                <span style={{ cursor: "pointer" }}>{`쇼핑백(${
                                    cartItemCount || 0
                                })`}</span>
                            )}
                        </div>
                        <div
                            onClick={() => navigate("/account/purchase")}
                            className="nav-icon"
                        >
                            <FontAwesomeIcon icon={faBox} />
                            {!isMobile && (
                                <span style={{ cursor: "pointer" }}>
                                    내 주문
                                </span>
                            )}
                        </div>
                        {isMobile && (
                            <div
                                className="nav-icon"
                                onClick={() => setShowSearchBox(true)}
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="nav-logo">
                <Link to="/">
                    <img
                        width={100}
                        src="/image/hm-logo.png"
                        alt="hm-logo.png"
                    />
                </Link>
            </div>
            <div className="nav-menu-area">
                <ul className="menu">
                    {menuList.map((menu, index) => (
                        <li key={index}>
                            <a href="#">{menu}</a>
                        </li>
                    ))}
                </ul>
                {!isMobile && (
                    <div className="search-box landing-search-box">
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            placeholder="제품검색"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={onCheckEnter}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
