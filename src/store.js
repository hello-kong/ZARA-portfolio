import { configureStore } from "@reduxjs/toolkit";
import NoticeSlice from "./slice/NoticeSlice";
import QnaSlice from "./slice/QnaSlice";
import DefaultAddressSlice from "./slice/DefaultAddressSlice";
import AddrSlice from "./slice/AddrSlice";
import ProductSlice from "./slice/ProductSlice";
import CategorySlice from "./slice/CategorySlice";
import AccountSlice from "./slice/AccountSlice";

const store = configureStore({
	reducer: {
		NoticeSlice: NoticeSlice,
		QnaSlice: QnaSlice,
		DefaultAddressSlice: DefaultAddressSlice,
		AddrSlice: AddrSlice,
		ProductSlice: ProductSlice,
		CategorySlice: CategorySlice,
		AccountSlice: AccountSlice,
	},
	middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: false,
        }),
    ],
	
});

export default store;