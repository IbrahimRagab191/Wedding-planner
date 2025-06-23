import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    UPDATE_USER,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    CLEAR_ERROR,
} from "../types";

const initialState = {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
        return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
        return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        };

    case LOGIN_FAIL:
        return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        };

    case UPDATE_USER:
        return {
        ...state,
        user: { ...state.user, ...action.payload },
        };

    case LOGOUT_SUCCESS:
        return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        };
    case CLEAR_ERROR:
        return {
            ...state,
            error: null,
        };
    default:
        return state;
    }
};

export default loginReducer;
