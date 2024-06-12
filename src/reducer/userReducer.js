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
        case types.LOGIN_WITH_TOKEN_SUCCESS:
            return { ...state, loading: false, user: payload.user };

        case types.LOGIN_WITH_TOKEN_REQUEST:
            return { ...state, loading: true };

        case types.LOGIN_REQUEST:
            return { ...state, loading: true };

        case types.LOGIN_SUCCESS:
        case types.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload?.user,
                error: "",
                isRegistered: true,
            };

        case types.LOGIN_FAIL:
            let loginErrorMessage = "이메일 또는 비밀번호가 틀렸습니다.";

            return {
                ...state,
                loading: false,
                error: loginErrorMessage,
                isRegistered: false,
            };

        case types.REGISTER_USER_FAIL:
            let registerErrorMessage = payload?.error || "Unknown error";
            if (registerErrorMessage.includes("이미 존재합니다")) {
                registerErrorMessage = "유저가 이미 존재합니다.";
            }
            return {
                ...state,
                loading: false,
                error: registerErrorMessage,
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
