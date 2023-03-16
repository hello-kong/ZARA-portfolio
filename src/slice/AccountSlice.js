import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { pending, fulfilled, rejected } from '../helper/ReduxHelper';

//import { cloneDeep } from 'lodash';

const URL = "/members";

export const getList = createAsyncThunk('AccountSlice/getList', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(URL);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 단일행 데이터 조회를 위한 비동기 함수 */
export const getItem = createAsyncThunk('AccountSlice/getItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(`${URL}/${payload.id}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 저장을 위한 비동기 함수 */
// export const postItem = createAsyncThunk('AccountSlice/postItem', async (payload, { rejectWithValue }) => {
//     let result = null;
    

//     try {
//         const response = await axios.post(URL, {
//             name: payload.name,
//             email: payload.email,
//             password: payload.password,
            
//         });
//         result = response.data;
//     } catch (err) {
//         result = rejectWithValue(err.response);
//     }

//     return result;
// });

/** 데이터 수정을 위한 비동기 함수 */
export const putItem = createAsyncThunk('AccountSlice/putItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.put(`${URL}/${payload.id}`, {
            name: payload.name,
            email: payload.email,
            password: payload.password,
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 삭제를 위한 비동기 함수 */
export const deleteItem = createAsyncThunk('AccountSlice/deleteItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.delete(`URL/${payload.id}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});


const AccountSlice = createSlice({
    name: "AccountSlice",
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
        // [getList.pending]: pending,
        // [getList.fulfilled]: fulfilled,
        // [getList.rejected]: rejected,

        /** 단일행 데이터 조회를 위한 액션 함수 */
        [getItem.pending]: pending,
        [getItem.fulfilled]: fulfilled,
        [getItem.rejected]: rejected,

        /** 데이터 저장을 위한 액션 함수 */
        // [postItem.pending]: pending,
        // [postItem.fulfilled]: fulfilled,
        // [postItem.rejected]: rejected,

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

export const { getCurrentData } = AccountSlice.actions;
export default AccountSlice.reducer;