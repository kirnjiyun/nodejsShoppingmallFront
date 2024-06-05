import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import productReducer from "./reducer/productReducer";
import cartReducer from "./reducer/cartReducer";
import commonUiReducer from "./reducer/commonUIReducer";
import orderReducer from "./reducer/orderReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
        cart: cartReducer,
        ui: commonUiReducer,
        order: orderReducer,
    },
});

export default store;
