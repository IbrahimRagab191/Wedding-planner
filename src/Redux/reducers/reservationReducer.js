const initialReservations = JSON.parse(localStorage.getItem("reservations")) || [];

const reservationReducer = (state = { reservations: initialReservations }, action) => {
    switch (action.type) {
        case "ADD_RESERVATION":
        return {
            ...state,
            reservations: [...state.reservations, action.payload],
        };

        default:
        return state;
    }
};

export default reservationReducer;
