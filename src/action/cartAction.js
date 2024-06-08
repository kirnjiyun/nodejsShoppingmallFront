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

const getCartList = () => async (dispatch) => {};
const deleteCartItem = (id) => async (dispatch) => {};
const updateQty = (id, value) => async (dispatch) => {};
const getCartQty = () => async (dispatch) => {};

export const cartActions = {
    addItemToCart,
    getCartList,
    deleteCartItem,
    updateQty,
    getCartQty,
};
