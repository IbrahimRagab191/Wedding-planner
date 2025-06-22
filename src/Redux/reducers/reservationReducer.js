import { ADD_RESERVATION } from "../types";

const initialState = {
  reservations: [], // هيكون فيها كل الحجوزات اللى عملها اليوزر
};

const reservationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RESERVATION:
        return {
            ...state,
            reservations: [...state.reservations, action.payload],
        };

        default:
        return state;
    }
};

export default reservationReducer;
