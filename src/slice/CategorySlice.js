import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from 'lodash';

const API_URL = '/category';

export const getList = createAsyncThunk('CategorySlice/getList', async (payload, { rejectWithValue }) => {
	let result = null;

	try {
		const response = await axios.get(API_URL);
		result = response.data;
	} catch (err) {
		result = rejectWithValue(err.response);
	}

	return result;
});

export const PostItem = createAsyncThunk('CategorySlice/PostItem', async (payload, { rejectWithValue }) => {
	let result = null;

	try {
		const response = await axios.post(API_URL, {
			depth1: payload.depth1,
			depth2: payload.depth2,
			depth1_id: payload.depth1_id
		});
		result = response.data;
	} catch (err) {
		result = rejectWithValue(err.response);
	}

	return result;
});

export const PutItem = createAsyncThunk('CategorySlice/PutItem', async (payload, { rejectWithValue }) => {
	let result = null;

	try {
		const response = await axios.put(API_URL, {
			depth1: payload.depth1,
			depth2: payload.depth2,
			depth1_id: payload.depth1_id,
			depth2_id: payload.depth2_id
		});
		result = response.data;
	} catch (err) {
		result = rejectWithValue(err.response);
	}

	return result;
});

export const DeleteItem = createAsyncThunk('CategorySlice/DeleteItem', async (payload, { rejectWithValue }) => {
	let result = null;

	try {
		const response = await axios.delete(API_URL, {
			data: {
				depth1_id: payload.depth1_id,
				depth2_id: payload.depth2_id
			}
		});
		result = response.data;
	} catch (err) {
		result = rejectWithValue(err.response);
	}

	return result;
});

const CategorySlice = createSlice({
	name: 'CategorySlice',
	initialState: {
		data: null,
		loading: false,
		error: null
	},
	reducers: {},
	extraReducers: {
		[getList.pending]: pending,
		[getList.fulfilled]: (state, { payload }) => {
            return {
                data: payload["data"],
                loading: false,
                error: false,
            };
        },
		[getList.rejected]: rejected,

		[PostItem.pending]: pending,
		[PostItem.fulfilled]: (state, { payload }) => {
            return {
                data: payload["data"],
                loading: false,
                error: false,
            };
        },
		[PostItem.rejected]: rejected,

		[PutItem.pending]: pending,
		[PutItem.fulfilled]: (state, { payload }) => {
            return {
                data: payload["data"],
                loading: false,
                error: false,
            };
        },
		[PutItem.rejected]: rejected,

		[DeleteItem.pending]: pending,
		[DeleteItem.fulfilled]: (state, { payload }) => {
            return {
                data: payload["data"],
                loading: false,
                error: false,
            };
        },
		[DeleteItem.rejected]: rejected,
	},
});

export default CategorySlice.reducer;