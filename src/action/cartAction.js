import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";

const addItemToCart =
    ({ id, size }) =>
    async (dispatch) => {
        try {
            dispatch({ type: types.ADD_TO_CART_REQUEST });
            const response = await api.post("/cart", {
                productId: id,
                size: size,
                qty: 1,
            });

            if (response.status !== 200) throw new Error(response.data.error);

            dispatch({
                type: types.ADD_TO_CART_SUCCESS,
                payload: response.data.cartItemQty,
            });
            dispatch(
                commonUiActions.showToastMessage(
                    "카트에 상품이 추가되었습니다.",
                    "success"
                )
            );
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            dispatch({ type: types.ADD_TO_CART_FAIL, payload: errorMessage });
            dispatch(commonUiActions.showToastMessage(errorMessage, "error"));
        }
    };

const updateQty = (id, value) => async (dispatch) => {
    try {
        dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });
        const response = await api.put(`/cart/${id}`, { qty: value });
        if (response.status !== 200) throw new Error(response.error);

        dispatch({
            type: types.UPDATE_CART_ITEM_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: error });
        dispatch(commonUiActions.showToastMessage(error, "error"));
    }
};

const deleteCartItem = (id) => async (dispatch) => {
    try {
        console.log("Deleting cart item with ID:", id);
        dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
        const response = await api.delete(`/cart/${id}`);
        console.log("API response:", response);

        if (response.status !== 200) throw new Error(response.error);

        dispatch({
            type: types.DELETE_CART_ITEM_SUCCESS,
            payload: response.data.cartItemQty,
        });
        dispatch(getCartList());
    } catch (error) {
        console.error("Error deleting cart item:", error);
        dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: error.message });
        dispatch(commonUiActions.showToastMessage(error.message, "error"));
    }
};

const getCartList = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_CART_LIST_REQUEST });
        const response = await api.get("/cart");
        if (response.status !== 200) throw new Error(response.data.error);
        dispatch({
            type: types.GET_CART_LIST_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.error });
    }
};
const getCartQty = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_CART_QTY_REQUEST });
        const response = await api.get("/cart/qty");
        if (response.status !== 200) throw new Error(response.error);
        dispatch({
            type: types.GET_CART_QTY_SUCCESS,
            payload: response.data.qty,
        });
    } catch (error) {
        dispatch({ type: types.GET_CART_QTY_FAIL, payload: error });
        dispatch(commonUiActions.showToastMessage(error, "error"));
    }
};

export const cartActions = {
    addItemToCart,
    getCartList,
    deleteCartItem,
    updateQty,
    getCartQty,
};
