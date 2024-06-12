import * as types from "../constants/user.constants";

const initialState = {
    loading: false,
    user: null,
    error: "",
    isRegistered: false,
};

function userReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case types.REGISTER_USER_REQUEST:
        case types.LOGIN_WITH_TOKEN_REQUEST:
        case types.LOGIN_REQUEST:
        case types.GOOGLE_LOGIN_REQUEST:
            return { ...state, loading: true };

        case types.REGISTER_USER_SUCCESS:
        case types.LOGIN_SUCCESS:
        case types.GOOGLE_LOGIN_SUCCESS:
        case types.LOGIN_WITH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload?.user || null,
                error: "",
                isRegistered: true,
            };

        case types.LOGIN_FAIL:
        case types.GOOGLE_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: payload?.error || "Unknown error",
                isRegistered: false,
            };

        case types.REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload?.error || "Unknown error",
                isRegistered: false,
            };

        case types.LOGIN_WITH_TOKEN_FAIL:
            return { ...state, loading: false };

        case types.LOGOUT:
            return {
                ...state,
                loading: false,
                user: null,
                error: "",
                isRegistered: false,
            };

        case types.CLEAR_ERRORS:
            return {
                ...state,
                error: "",
            };

        default:
            return state;
    }
}

export default userReducer;
