import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiAction } from "./commonUiAction";
const getProductList = (query) => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_GET_REQUEST });

        const response = await api.get("/product", { params: { ...query } });
        console.log("Rrr", response);

        if (response.status !== 200) throw new Error(response.error);

        dispatch({
            type: types.PRODUCT_GET_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: types.PRODUCT_GET_FAIL,
            payload: error.message || error,
        });
        dispatch(
            commonUiActions.showToastMessage(
                error.message || "Error fetching products",
                "error"
            )
        );
    }
};

const getProductDetail = (id) => async (dispatch) => {};

const createProduct = (formData) => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_CREATE_REQUEST });
        const response = await api.post("/product", formData);

        if (response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.PRODUCT_CREATE_SUCCESS });
        dispatch(commonUiActions.showToastMessage("상품생성완료", "success"));
        // 생성 후 제품 목록 다시 불러오기
        dispatch(getProductList());
    } catch (error) {
        dispatch({
            type: types.PRODUCT_CREATE_FAIL,
            payload: error.message || error,
        });
        dispatch(
            commonUiActions.showToastMessage(
                error.message || "Error creating product",
                "error"
            )
        );
    }
};

const deleteProduct = (id) => async (dispatch) => {};

const editProduct = (formData, id) => async (dispatch) => {};

export const productActions = {
    getProductList,
    createProduct,
    deleteProduct,
    editProduct,
    getProductDetail,
};
