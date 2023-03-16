import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";

export const NoticeList = createAsyncThunk(
    "NoticeSlice/NoticeList",
    async (payload, { rejectWithValue }) => {
        let result = null;

        try {
            const response = await axios.get("/notice", {
                params: payload,
            });
            result = response.data;
        } catch (e) {
            result = rejectWithValue(e.response);
        }

        return result;
    }
);

export const NoticeItem = createAsyncThunk('NoticeSlice/NoticeItem', async (payload, {rejectWithValue}) => {
	  	let result = null;
	  	
	  	try {
	  		const response = await axios.get(`/notice/${payload.id}`);
	  		result = response.data;
	  	} catch (e) {
	  		console.error(e);
	  		result = rejectWithValue(e.response);
	  	}
	  
	  	return result;
	  });
	  
export const NoticePost = createAsyncThunk('NoticeSlice/NoticePost', async (payload, {rejectWithValue}) => {
	  	let result = null;
	  	
	  	try {
	  		const response = await axios.post('/notice', {
	  			title: payload.title,
	  			content: payload.content
	  		});
	  		result = response.data;
	  	} catch (e) {
	  		console.error(e);
	  		result = rejectWithValue(e.response);
	  	}
	  
	  	return result;
	  });
	  
export const NoticePut = createAsyncThunk('NoticeSlice/NoticePut', async (payload, {rejectWithValue}) => {
	  	let result = null;
	  	
	  	try {
	  		const response = await axios.put(`/notice/${payload.id}`, {
	  			title: payload.title,
	  			content: payload.content
	  		});
	  		result = response.data;
	  	} catch (e) {
	  		console.error(e);
	  		result = rejectWithValue(e.response);
	  	}
	  
	  	return result;
	  });
	  
export const NoticeDelete = createAsyncThunk('NoticeSlice/NoticeDelete', async (payload, {rejectWithValue}) => {
	  	let result = null;
	  	
	  	try {
	  		const response = await axios.delete(`/notice/${payload.id}`);
	  		result = response.data;
	  	} catch (e) {
	  		console.error(e);
			  result = rejectWithValue(e.response);
		  }
	});

const NoticeSlice = createSlice({
    name: "NoticeSlice",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
		[NoticeList.pending]: pending,
		[NoticeList.fulfilled]: fulfilled,
  		[NoticeList.fulfilled]: (state, {payload}) => {
  			const params = {};
  			params['notice'] = payload['data'];
  			params['pagenation'] = payload['pagenation'];
  
  			return {
  				data: params,
  				loading: false,
  				error: false
  			};
  		},
		[NoticeList.rejected]: rejected,
  
  		[NoticeItem.pending]: pending,
  		[NoticeItem.fulfilled]: (state, {payload}) => {
  			return {
  				data: payload['data'],
  				loading: false,
  				error: false
  			};
  		},
  		[NoticeItem.rejected]: rejected,
  
  		[NoticePost.pending]: pending,
  		[NoticePost.fulfilled]: (state, {payload}) => {
  			return {
  				data: payload['data'],
  				loading: false,
  				error: false
  			};
  		},
  		[NoticePost.rejected]: rejected,
  
  		[NoticePut.pending]: pending,
  		[NoticePut.fulfilled]:  (state, {payload}) => {
  			return {
  				data: payload['data'],
  				loading: false,
  				error: false
  			};
  		},
  		[NoticePut.rejected]: rejected,
  
  		[NoticeDelete.pending]: pending,
  		[NoticeDelete.fulfilled]: fulfilled,
  		[NoticeDelete.rejected]: rejected,
	},
});

export default NoticeSlice.reducer;
