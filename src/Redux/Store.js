import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";


const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;


const initialState = {
    login: {
        loading: false,
        isAuthenticated: !!userInfoFromStorage,
        user: userInfoFromStorage,
        error: null,
    },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
