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
    try {
        dispatch({ type: types.PRODUCT_GET_REQUEST });
        const response = await api.get(`/product/${id}`);
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
                error.message || "Error fetching product details",
                "error"
            )
        );
    }
};

const createProduct = (formData) => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_CREATE_REQUEST });
        const response = await api.post("/product", formData);
        if (response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.PRODUCT_CREATE_SUCCESS });
        dispatch(
            commonUiActions.showToastMessage(
                "Product created successfully",
                "success"
            )
        );
        dispatch(getProductList());
    } catch (error) {
        console.error("Product creation error:", error);
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
    try {
        dispatch({ type: types.PRODUCT_DELETE_REQUEST });
        const response = await api.delete(`/product/${id}`);
        if (response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.PRODUCT_DELETE_SUCCESS, payload: id });
        dispatch(
            commonUiActions.showToastMessage(
                "Product deleted successfully",
                "success"
            )
        );
        dispatch(getProductList());
    } catch (error) {
        console.error("Product deletion error:", error);
        dispatch({
            type: types.PRODUCT_DELETE_FAIL,
            payload: error.message || error,
        });
        dispatch(
            commonUiActions.showToastMessage(
                error.message || "Error deleting product",
                "error"
            )
        );
    }
};

const updateProduct = (formData, id) => async (dispatch) => {
    try {
        dispatch({ type: types.PRODUCT_EDIT_REQUEST });

        if (!id) {
            throw new Error("Product ID is missing");
        }
        const response = await api.put(`/product/${id}`, formData);
        if (response.status !== 200) throw new Error(response.error);

        dispatch({ type: types.PRODUCT_EDIT_SUCCESS });
        dispatch(commonUiActions.showToastMessage("상품 수정 완료", "success"));
        dispatch(getProductList({ page: 1, name: "" }));
    } catch (error) {
        console.error("Product editing error:", error);
        dispatch({
            type: types.PRODUCT_EDIT_FAIL,
            payload: error.message || error,
        });
        dispatch(
            commonUiActions.showToastMessage(
                error.message || "상품 수정 실패",
                "error"
            )
        );
    }
};

export const productActions = {
    getProductList,
    getProductListAll,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductDetail,
};
