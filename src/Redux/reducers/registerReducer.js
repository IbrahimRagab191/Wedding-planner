import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../types";

const initialRegisterState = {
  loading: false,
  error: null,
  success: false,
};

const registerReducer = (state = initialRegisterState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, success: true };
    case REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default registerReducer;
