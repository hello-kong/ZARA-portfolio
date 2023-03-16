import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { cloneDeep } from "lodash";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";

const API_URL = "/product";

export const Productget = createAsyncThunk("ProductSlice/Productget", async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(API_URL, {
            params: payload,
        });

        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

export const ProductItem = createAsyncThunk("ProductSlice/ProductItem", async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(`${API_URL}/${payload.id}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

export const ProductPost = createAsyncThunk("ProductSlice/ProductPost", async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(API_URL, {
            name: payload.name,
            price: payload.price,
            dsc: payload.dsc,
            use_amount: payload.use_amount,
            depth2_id: payload.depth2_id,
            color: payload.color,
            size: payload.size,
            file: payload.file,
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

export const ProductPostDetail = createAsyncThunk("ProductSlice/ProductPostDetail", async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(`${API_URL}/:id`, {
            detail: payload.detail,
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

export const ProductImgPost = createAsyncThunk("ProductSlice/ProductImgPost", async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(`${API_URL}img`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

export const ProductPut = createAsyncThunk("ProductSlice/ProductPut", async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.put(`${API_URL}/${payload.id}`, {
            name: payload.name,
            price: payload.price,
            dsc: payload.dsc,
            use_amount: payload.use_amount,
            depth2_id: payload.depth2_id,
            color: payload.color,
            size: payload.size,
            detail_id: payload.detail_id,
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

export const ProductDelete = createAsyncThunk("ProductSlice/ProductDelete", async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.delete(`${API_URL}/${payload.id}`, {
            data: {
                color: payload.color,
            },
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

export const ProductImgDelete = createAsyncThunk("ProductSlice/ProductImgDelete", async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.delete(`${API_URL}img/${payload.id}`, {
            data: {
                color: payload.color,
            },
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

const ProductSlice = createSlice({
    name: "ProductSlice",
    initialState: {
        data: null,
        file: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [Productget.pending]: pending,
        [Productget.fulfilled]: (state, { payload }) => {
            const params = {};
            params["product"] = payload["data"];
            params["pagenation"] = payload["pagenation"];
            return {
                ...state,
                data: params,
                loading: false,
                error: false,
            };
        },
        [Productget.rejected]: rejected,

        [ProductItem.pending]: pending,
        [ProductItem.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                data: payload["data"],
                loading: false,
                error: false,
            };
        },
        [ProductItem.rejected]: rejected,

        [ProductPost.pending]: pending,
        [ProductPost.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                data: payload["data"],
                loading: false,
                error: false,
            };
        },
        [ProductPost.rejected]: rejected,

        [ProductPostDetail.pending]: pending,
        [ProductPostDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                data: payload["data"],
                loading: false,
                error: false,
            };
        },
        [ProductPostDetail.rejected]: rejected,

        [ProductImgPost.pending]: pending,
        [ProductImgPost.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                file: payload["data"],
                loading: false,
                error: false,
            };
        },
        [ProductImgPost.rejected]: rejected,

        [ProductPut.pending]: pending,
        [ProductPut.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                data: payload["data"],
                loading: false,
                error: false,
            };
        },
        [ProductPut.rejected]: rejected,

        [ProductDelete.pending]: pending,
        [ProductDelete.fulfilled]: (state, { payload }) => {
            const result = cloneDeep(state.data.product);
            const index = result.findIndex((v, i) => v.id == payload.data);
            result.splice(index, 1);
            let params = {};
            params.product = result;
            params.pagenation = state.data.pagenation;
            return {
                ...state,
                data: params,
                loading: false,
                error: false,
            };
        },
        [ProductDelete.rejected]: rejected,

        [ProductImgDelete.pending]: pending,
        [ProductImgDelete.fulfilled]: (state, { payload }) => {
            const result = cloneDeep(state.data.product);
            const index = result.findIndex((v, i) => v.id == payload.data);
            result.splice(index, 1);
            let params = {};
            params.product = result;
            params.pagenation = state.data.pagenation;
            return {
                ...state,
                data: params,
                loading: false,
                error: false,
            };
        },
        [ProductImgDelete.rejected]: rejected,
    },
});

export default ProductSlice.reducer;
