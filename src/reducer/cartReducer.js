import * as types from "../constants/cart.constants";
import {
    LOGIN_SUCCESS,
    GOOGLE_LOGIN_SUCCESS,
    LOGOUT,
} from "../constants/user.constants";

const initialState = {
    loading: false,
    error: "",
    cartList: [],
    selectedItem: {},
    cartItemQty: 0,
    totalPrice: 0,
};

function cartReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGOUT: {
            return { ...state, cartItemQty: 0, cartList: [] };
        }
        case types.ADD_TO_CART_REQUEST:
        case types.GET_CART_LIST_REQUEST:
        case types.DELETE_CART_ITEM_REQUEST:
        case types.UPDATE_CART_ITEM_REQUEST:
        case types.GET_CART_QTY_REQUEST:
            return { ...state, loading: true };

        case types.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItemQty: state.cartItemQty + 1,
                cartList: [...state.cartList, payload],
            };
        case types.DELETE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItemQty: state.cartItemQty - 1,
                cartList: state.cartList.filter((item) => item._id !== payload),
            };
        case types.UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartList: state.cartList.map((item) =>
                    item._id === payload._id ? payload : item
                ),
            };
        case types.GET_CART_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                cartList: payload,
            };
        case types.GET_CART_QTY_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItemQty: payload,
            };
        case types.ADD_TO_CART_FAIL:
        case types.GET_CART_LIST_FAIL:
        case types.DELETE_CART_ITEM_FAIL:
        case types.UPDATE_CART_ITEM_FAIL:
        case types.GET_CART_QTY_FAIL:
            return { ...state, loading: false, error: payload };
        default:
            return state;
    }
}

export default cartReducer;
