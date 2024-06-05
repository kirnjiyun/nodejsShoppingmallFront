import * as types from "../constants/commonUI.constants";

const commonUiActions = {
    showToastMessage: (message, status) => ({
        type: types.SET_TOAST_MESSAGE,
        payload: { message, status },
    }),
};

export { commonUiActions };
