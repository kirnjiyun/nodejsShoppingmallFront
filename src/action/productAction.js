import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiAction } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
    try {
        console.log("getProductList action called"); // 액션 호출 확인 로그
        dispatch({ type: types.PRODUCT_GET_REQUEST });
        console.log("API call starting"); // API 호출 시작 로그
        const response = await api.get("/product", { params: query });
        console.log("API call completed", response); // API 호출 완료 로그
        if (response.status !== 200) throw new Error(response.error);
        dispatch({
            type: types.PRODUCT_GET_SUCCESS,
            payload: response.data.data,
        });
    } catch (error) {
        console.error("API call failed", error); // 에러 로그
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
        console.log("createProduct action called"); // 액션 호출 확인 로그
        dispatch({ type: types.PRODUCT_CREATE_REQUEST });
        const response = await api.post("/product", formData);
        console.log("API call completed", response); // API 호출 완료 로그
        if (response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.PRODUCT_CREATE_SUCCESS });
        dispatch(commonUiActions.showToastMessage("상품생성완료", "success"));
        // 생성 후 제품 목록 다시 불러오기
        dispatch(getProductList());
    } catch (error) {
        console.error("API call failed", error); // 에러 로그
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
