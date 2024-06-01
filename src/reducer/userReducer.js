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
        case types.REGISTER_USER_FAIL:
            let errorMessage = payload?.error || "Unknown error";
            if (errorMessage.includes("이미 존재합니다")) {
                errorMessage = "유저가 이미 존재합니다.";
            }
            return {
                ...state,
                loading: false,
                error: errorMessage,
                isRegistered: false,
            };
        case types.LOGOUT:
            return {
                ...state,
                loading: false,
                user: null,
                error: "",
                isRegistered: false,
            };
        default:
            return state;
    }
}
export default userReducer;
