import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { pending, fulfilled, rejected } from '../helper/ReduxHelper';
import { cloneDeep } from 'lodash';

const URL = "/address";

export const getList = createAsyncThunk('AddrSlice/getList', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.get(URL);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

// /** 단일행 데이터 조회를 위한 비동기 함수 */
export const getItem = createAsyncThunk('AddrSlice/getItem', async (payload, { rejectWithValue }) => {
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
export const postItem = createAsyncThunk('AddrSlice/postItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.post(URL, {
            addname: payload.addname,
            postcode: payload.postcode,
            roadaddr: payload.roadaddr,
            detailaddr: payload.detailaddr,
            tel: payload.tel,
            members_id: 6,
        });
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 수정을 위한 비동기 함수 */
export const putItem = createAsyncThunk('AddrSlice/putItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.put(`URL/${payload.id}`, {
            addname: payload.addname,
            company: payload.company,
            crn: payload.crn,
            postcode: payload.postcode,
            roadaddr: payload.roadaddr,
            detailaddr: payload.detailaddr,
            // region: payload.region,
            // countrycode: payload.countrycode,
            tel: payload.tel
        });
        
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** 데이터 삭제를 위한 비동기 함수 */
export const deleteItem = createAsyncThunk('AddrSlice/deleteItem', async (payload, { rejectWithValue }) => {
    let result = null;

    try {
        const response = await axios.delete(`URL/${payload.id}`);
        result = response.data;
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});


const AddrSlice = createSlice({
    name: "AddrSlice",
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

        // /** 단일행 데이터 조회를 위한 액션 함수 */
        // [getItem.pending]: pending,
        // [getItem.fulfilled]: fulfilled,
        // [getItem.rejected]: rejected,

        /** 데이터 저장을 위한 액션 함수 */
        [postItem.pending]: pending,
        [postItem.fulfilled]: (state, {meta, payload}) => {
            // 기존의 상태갓을 복사한다. (원본이 JSON이므로 깊은 복사를 수행해야 한다.)
            const data = cloneDeep(state.data);
            console.log(data);

            // 새로 저장된 결과를 기존 상태값 배열의 맨 뒤에 추가 한다.
            data.push(payload);

            return {
                data: data,
                loading: false,
                error: null
            }
        },
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

export const { getCurrentData } = AddrSlice.actions;
export default AddrSlice.reducer;