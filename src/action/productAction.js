import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

const getProductList = (query) => async (dispatch) => {
    console.log("getProductList 호출됨");
    try {
        dispatch({ type: types.PRODUCT_GET_REQUEST });
        console.log("PRODUCT_GET_REQUEST 디스패치됨");

        const response = await api.get("/product", { params: { ...query } });
        console.log("API 응답 받음:", response);

        if (response.status !== 200) throw new Error(response.error);

        dispatch({
            type: types.PRODUCT_GET_SUCCESS,
            payload: response.data.data,
        });
        console.log("PRODUCT_GET_SUCCESS 디스패치됨");
    } catch (error) {
        console.error("제품 가져오기 에러:", error); // 디버깅을 위한 에러 로그
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
    console.log("createProduct 호출됨");
    try {
        dispatch({ type: types.PRODUCT_CREATE_REQUEST });
        console.log("PRODUCT_CREATE_REQUEST 디스패치됨");

        const response = await api.post("/product", formData);
        console.log("API 응답 받음:", response);

        if (response.status !== 200) throw new Error(response.error);
        dispatch({ type: types.PRODUCT_CREATE_SUCCESS });
        console.log("PRODUCT_CREATE_SUCCESS 디스패치됨");

        dispatch(commonUiActions.showToastMessage("상품생성완료", "success"));
        // 생성 후 제품 목록 다시 불러오기
        dispatch(getProductList());
    } catch (error) {
        console.error("제품 생성 에러:", error); // 디버깅을 위한 에러 로그
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
    createProduct,
    deleteProduct,
    editProduct,
    getProductDetail,
};
