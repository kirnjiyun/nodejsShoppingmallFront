import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_GET_REQUEST });
        const response = await api.get("/product", { params: { ...query } });
        if (response.status !== 200) throw new Error(response.error);
        dispatch({
            type: types.PRODUCT_GET_SUCCESS,
            payload: response.data,
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

const getProductListAll = () => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_GET_REQUEST });
        const response = await api.get("/product/all");
        if (response.status !== 200) throw new Error(response.error);
        dispatch({
            type: types.PRODUCT_GET_SUCCESS,
            payload: response.data,
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

const getProductDetail = (id) => async (dispatch) => {
    console.log("getProductDetail 호출됨");
};

const createProduct = (formData) => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_CREATE_REQUEST });

        const response = await api.post("/product", formData);

        if (response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.PRODUCT_CREATE_SUCCESS });

        dispatch(commonUiActions.showToastMessage("상품생성완료", "success"));

        dispatch(getProductList());
    } catch (error) {
        console.error("제품 생성 에러:", error);
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

const deleteProduct = (id) => async (dispatch) => {
    console.log("deleteProduct 호출됨");
};

const editProduct = (formData, id) => async (dispatch) => {
    console.log("editProduct 호출됨");
};

export const productActions = {
    getProductList,
    getProductListAll,
    createProduct,
    deleteProduct,
    editProduct,
    getProductDetail,
};
