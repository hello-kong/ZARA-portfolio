import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pending, fulfilled, rejected } from "../helper/ReduxHelper";
import { cloneDeep } from "lodash";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

export const QnaList = createAsyncThunk(
    "QnaSlice/QnaList",
    async (payload, { rejectWithValue }) => {
        let result = null;

        try {
            const response = await axios.get("/qna", {
                params: payload,
            });
            result = response.data;
        } catch (e) {
            result = rejectWithValue(e.response);
        }

        return result;
    }
);

export const QnaItem = createAsyncThunk(
    "QnaSlice/QnaItem",
    async (payload, { rejectWithValue }) => {
        let result = null;

        try {
            const response = await axios.get(`/qna/${payload.id}`);
            result = response.data;
        } catch (e) {
            result = rejectWithValue(e.response);
        }

        return result;
    }
);

export const QnaPost = createAsyncThunk(
    "QnaSlice/QnaPost",
    async (payload, { rejectWithValue }) => {
        let result = null;

        try {
            const response = await axios.post("/qna", {
                title: payload.title,
                content: payload.content,
                qna_type: payload.type,
                members_id: 5,
            });
            result = response.data;
        } catch (e) {
            result = rejectWithValue(e.response);
        }

        return result;
    }
);

export const QnaPut = createAsyncThunk(
    "QnaSlice/QnaPut",
    async (payload, { rejectWithValue }) => {
        let result = null;

        try {
            const response = await axios.put(`/qna/${payload.id}`, {
                title: payload.title,
                content: payload.content,
                qna_type: payload.type,
                answer: payload.answer,
            });
            result = response.data;
        } catch (e) {
            result = rejectWithValue(e.response);
        }

        return result;
    }
);

export const QnaDelete = createAsyncThunk(
    "QnaSlice/QnaDelete",
    async (payload, { rejectWithValue }) => {
        let result = null;

        try {
            const response = await axios.delete(`/qna/${payload.id}`);
            result = response.data;
        } catch (e) {
            result = rejectWithValue(e.response);
        }

        return result;
    }
);

const QnaSlice = createSlice({
    name: "QnaSlice",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        getCurrent: (state, { payload }) => {
            return state;
        },
    },
    extraReducers: {
        [QnaList.pending]: pending,
        [QnaList.fulfilled]: (state, { payload }) => {
            const params = {};
            params["qna"] = payload["data"];
            params["pagenation"] = payload["pagenation"];

            return {
                data: params,
                loading: false,
                error: false,
            };
        },
        [QnaList.rejected]: rejected,

        [QnaItem.pending]: pending,
        [QnaItem.fulfilled]: (state, { payload }) => {
            return {
                data: payload["data"],
                loading: false,
                error: false,
            };
        },
        [QnaItem.rejected]: rejected,

        [QnaPost.pending]: pending,
        [QnaPost.fulfilled]: (state, { payload }) => {
            return {
                data: payload["data"],
                loading: false,
                error: false,
            };
        },
        [QnaPost.rejected]: rejected,

        [QnaPut.pending]: pending,
        [QnaPut.fulfilled]: (state, { payload }) => {
            return {
                data: payload["data"],
                loading: false,
                error: false,
            };
        },
        [QnaPut.rejected]: rejected,

        [QnaDelete.pending]: pending,
        [QnaDelete.fulfilled]: fulfilled,
        [QnaDelete.rejected]: rejected,
    },
});

export const { getCurrent } = QnaSlice.actions;
export default QnaSlice.reducer;
