const pending = (state, {payload}) => {
	return {...state, loading: true};
};

const fulfilled = (state, {payload}) => {
	return {
		data: payload,
		loading: false,
		error: null
	};
};

const rejected = (state, {payload}) => {
	return {
		...state,
		loading: false,
		error: {
			code: payload?.status ? payload.status : 500,
			message: payload?.statusText ? payload.statusText : 'Server Error'
		}
	};
};

export {pending, fulfilled, rejected};