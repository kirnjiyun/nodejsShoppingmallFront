import * as types from "../constants/order.constants";

const initialState = {
    orderNum: null,
    loading: false,
    error: null,
};

function orderReducer(state = initialState, action) {
    const { type, payload } = action;
    console.log("orderReducer: Action received", action);

    switch (type) {
        case types.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.CREATE_ORDER_SUCCESS:
            console.log("orderReducer: Order success, payload:", payload);
            return {
                ...state,
                loading: false,
                orderNum: payload,
            };
        case types.CREATE_ORDER_FAIL:
            console.error("orderReducer: Order failed, payload:", payload);
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}

export default orderReducer;
