import { combineReducers } from "redux";
import  loginReducer  from "./loginReducer";
import registerReducer from "./registerReducer";
import reservationReducer from "./reservationReducer";
import viewedHallsReducer from "./viewedHallsReducer";
const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  reservation: reservationReducer,
  viewedHalls: viewedHallsReducer,
});

export default rootReducer;
