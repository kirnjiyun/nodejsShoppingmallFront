import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
const loginWithToken = () => async (dispatch) => {};
const loginWithEmail =
    ({ email, password }) =>
    async (dispatch) => {
        try {
            dispatch({ type: types.LOGIN_REQUEST });
            const response = await api.post("/auth/login", { email, password });
            if (response !== 200) throw new Error(response.error);
            dispatch({ type: types.LOGIN_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: types.LOGIN_FAIL, payload: error.error });
        }
    };
const logout = () => async (dispatch) => {};

const loginWithGoogle = (token) => async (dispatch) => {};

const registerUser =
    ({ email, name, password }, navigate) =>
    async (dispatch) => {};
export const userActions = {
    loginWithToken,
    loginWithEmail,
    logout,
    loginWithGoogle,
    registerUser,
};
