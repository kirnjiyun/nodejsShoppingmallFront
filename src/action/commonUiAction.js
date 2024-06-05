import * as types from "../constants/commonUI.constants";

export const showToastMessage = (message, status) => ({
    type: types.SET_TOAST_MESSAGE,
    payload: { message, status },
});
