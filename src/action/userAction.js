import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";

const loginWithToken = () => async (dispatch) => {
    try {
        dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });

        const response = await api.get("/user/me");

        if (response.status !== 200) {
            throw new Error(response.data.error || "Unknown error occurred");
        }

        console.log("rrr", response);

        dispatch({
            type: types.LOGIN_WITH_TOKEN_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error("Error logging in with token:", error.message);
        dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL });
        dispatch(logout());
    }
};

const loginWithEmail =
    ({ email, password }) =>
    async (dispatch) => {
        try {
            dispatch({ type: types.LOGIN_REQUEST });
            const response = await api.post("/auth/login", { email, password });
            if (response.status !== 200) throw new Error(response.data.error);

            const { token, user } = response.data;
            sessionStorage.setItem("token", token);
            dispatch({ type: types.LOGIN_SUCCESS, payload: { user, token } });
        } catch (error) {
            dispatch({ type: types.LOGIN_FAIL, payload: error.message });
            dispatch(logout());
        }
    };

const logout = () => async (dispatch) => {
    dispatch({ type: types.LOGOUT });
    sessionStorage.removeItem("token");
};

const loginWithGoogle = (token) => async (dispatch) => {
    // Google 로그인 구현 추가
};

const registerUser =
    ({ email, name, password }) =>
    async (dispatch) => {
        try {
            dispatch({ type: types.REGISTER_USER_REQUEST });
            const response = await api.post("/user", { email, name, password });
            if (response.status !== 200) throw new Error(response.data.error);
            dispatch({
                type: types.REGISTER_USER_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            let errorMessage = "Unknown error";
            if (error.message) {
                errorMessage = error.message;
            }
            dispatch({
                type: types.REGISTER_USER_FAIL,
                payload: { error: errorMessage },
            });
        }
    };

export const userActions = {
    loginWithToken,
    loginWithEmail,
    logout,
    loginWithGoogle,
    registerUser,
};
