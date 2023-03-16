import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { pending, fulfilled, rejected } from '../helper/ReduxHelper';

//import { cloneDeep } from 'lodash';

const URL = "edit_email";

export const getList = createAsyncThunk('EditEmailSlice/getList', async (payload, { rejectWithValue }) => {
    let result = null;
    let params = null;

    try {
        const response = await axios.get(URL, {
            params: params
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 단일행 데이터 조회를 위한 비동기 함수 */
export const getItem = createAsyncThunk('EditEmailSlice/getItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(`URL/:id`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 저장을 위한 비동기 함수 */
export const postItem = createAsyncThunk('EditEmailSlice/postItem', async (payload, { rejectWithValue }) => {
    let result = null;
    const params = null;

    try {
        const response = await axios.post(URL, params);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 수정을 위한 비동기 함수 */
export const putItem = createAsyncThunk('EditEmailSlice/putItem', async (payload, { rejectWithValue }) => {
    let result = null;
    const params = null;

    try {
        const response = await axios.put(`URL/:id`, params);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 삭제를 위한 비동기 함수 */
export const deleteItem = createAsyncThunk('EditEmailSlice/deleteItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.delete(`URL/:id`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});


const EditEmailSlice = createSlice({
    name: "EditEmailSlice",
    initialState: {
        data: null,
        pagenation: null,
        loading: false,
        error: null,
    },
    reducers: {
        getCurrentData: (state, action) => {
            return state;
        },
    },
    extraReducers: {
        /** 다중행 데이터 조회를 위한 액션 함수 */
        [getList.pending]: pending,
        [getList.fulfilled]: fulfilled,
        [getList.rejected]: rejected,

        /** 단일행 데이터 조회를 위한 액션 함수 */
        [getItem.pending]: pending,
        [getItem.fulfilled]: fulfilled,
        [getItem.rejected]: rejected,

        /** 데이터 저장을 위한 액션 함수 */
        [postItem.pending]: pending,
        [postItem.fulfilled]: fulfilled,
        [postItem.rejected]: rejected,

        /** 데이터 수정을 위한 액션 함수 */
        [putItem.pending]: pending,
        [putItem.fulfilled]: fulfilled,
        [putItem.rejected]: rejected,

        /** 데이터 삭제 위한 액션 함수 */
        [deleteItem.pending]: pending,
        [deleteItem.fulfilled]: fulfilled,
        [deleteItem.rejected]: rejected,
    },
});

export const { getCurrentData } = EditEmailSlice.actions;
export default EditEmailSlice.reducer;