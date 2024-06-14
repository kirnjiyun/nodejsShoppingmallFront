import axios from "axios";
import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";

// 토큰으로 로그인하는 액션
const loginWithToken = () => async (dispatch) => {
    try {
        dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });

        const response = await api.get("/user/me");

        if (response.status !== 200) {
            throw new Error(response.data.error || "Unknown error occurred");
        }

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

// 이메일과 비밀번호로 로그인하는 액션
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
            const errorMessage = error.response?.data?.error || error.message;
            dispatch({
                type: types.LOGIN_FAIL,
                payload: { error: errorMessage },
            });
        }
    };

// 로그아웃하는 액션
const logout = () => async (dispatch) => {
    dispatch({ type: types.LOGOUT });
    sessionStorage.removeItem("token");
};

// 구글로 로그인하는 액션
const loginWithGoogle = (credential) => async (dispatch) => {
    try {
        dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
        const response = await api.post("/auth/google", { credential });

        if (response.status !== 200) {
            throw new Error(response.data.error || "Unknown error occurred");
        }

        const { token, user } = response.data;
        if (!token) {
            throw new Error("Token is undefined");
        }

        sessionStorage.setItem("token", token);
        dispatch({
            type: types.GOOGLE_LOGIN_SUCCESS,
            payload: { user, token },
        });
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.message;
        dispatch({
            type: types.GOOGLE_LOGIN_FAIL,
            payload: { error: errorMessage },
        });
        dispatch(commonUiActions.showToastMessage(errorMessage, "error"));
    }
};

// 새로운 사용자를 등록하는 액션
const registerUser =
    ({ name, email, password }) =>
    async (dispatch) => {
        try {
            dispatch({ type: types.REGISTER_USER_REQUEST });
            const response = await api.post("/user", {
                name,
                email,
                password,
            });
            if (response.status !== 200) throw new Error(response.data.error);

            dispatch({
                type: types.REGISTER_USER_SUCCESS,
                payload: response.data,
            });
            dispatch(
                commonUiActions.showToastMessage(
                    "회원가입이 완료되었습니다.",
                    "success"
                )
            );
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            dispatch({
                type: types.REGISTER_USER_FAIL,
                payload: { error: errorMessage },
            });
            dispatch(
                commonUiActions.showToastMessage(
                    error.message || "회원가입 실패",
                    "error"
                )
            );
        }
    };

// 오류를 지우는 액션
const clearErrors = () => ({ type: types.CLEAR_ERRORS });

// 카카오로 로그인하는 액션
const loginWithKakao = (code) => async (dispatch) => {
    try {
        dispatch({ type: types.KAKAO_LOGIN_REQUEST });

        const response = await api.post("/auth/kakao", { code });
        if (response.status !== 200) throw new Error(response.data.error);

        const { token, user } = response.data;
        sessionStorage.setItem("token", token);

        dispatch({
            type: types.KAKAO_LOGIN_SUCCESS,
            payload: { user, token },
        });
    } catch (error) {
        const errorMessage = error.response?.data?.error || error.message;
        dispatch({
            type: types.KAKAO_LOGIN_FAIL,
            payload: { error: errorMessage },
        });
        dispatch(commonUiActions.showToastMessage(errorMessage, "error"));
    }
};

export const userActions = {
    loginWithToken,
    loginWithEmail,
    logout,
    loginWithGoogle,
    loginWithKakao,
    registerUser,
    clearErrors,
};
