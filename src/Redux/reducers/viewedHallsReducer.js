const initialState = {
    viewed: [],
};

const viewedHallsReducer = (state = initialState, action) => {
    switch (action.type) {
    case "ADD_VIEWED_HALL":
        const updated = [
        ...state.viewed.filter((id) => id !== action.payload),
        action.payload,
        ];
        const lastThree = updated.slice(-3); // احتفاظ بآخر 3 فقط
        return {
        ...state,
        viewed: lastThree,
        };

    case "CLEAR_VIEWED_HALLS":
        return { ...state, viewed: [] };

    default:
        return state;
    }
};

export default viewedHallsReducer;
