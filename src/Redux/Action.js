import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
} from "./types";
import { ADD_RESERVATION } from "./types";
import reservationReducer from "./reducers/reservationReducer";
import { UPDATE_USER } from "./types";
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from "./types";
// ✅ Register Action
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "http://localhost/route2/project/api/auth/register.php",
      userData,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response?.data?.error || "Registration failed",
    });
  }
};

// ✅ Login Action 
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios.post(
      "http://localhost/route2/project/api/auth/login.php",
      { email, password },
      config
    );

    const data = response.data;

    if (data.success) {
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      localStorage.setItem("token", data.token);  
      localStorage.setItem("userInfo", JSON.stringify(data.user));
    }
    
    else {
      dispatch({ type: LOGIN_FAIL, payload: data.message || "Login failed" });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || error.message || "Login failed",
    });
  }
};


export const addReservation = (reservation) => {
  return {
    type: ADD_RESERVATION,
    payload: reservation,
    reservation: reservationReducer,
  };
};
// actions/viewedHallsActions.js

export const addViewedHall = (id) => {
  return {
    type: "ADD_VIEWED_HALL",
    payload: id,
  };
};

export const clearViewedHalls = () => {
  return {
    type: "CLEAR_VIEWED_HALLS",
  };
};


export const updateUser = (updatedData) => {
  return {
    type: UPDATE_USER,
    payload: updatedData,
  };
};



export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");

      dispatch({ type: LOGOUT_SUCCESS });
    }, 1000);
  };
};

export const clearError = () => ({
  type: CLEAR_ERROR,
});
