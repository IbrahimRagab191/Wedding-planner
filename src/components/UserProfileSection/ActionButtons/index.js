// import React from "react";
// import "../../../components/UserProfileSection/ActionButtons/ActionButtons.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../../../Redux/Action";

// const ActionButtons = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         dispatch(logout());
//         navigate("/");
//     };

//     return (
//         <div className="action-buttons">
//             <Link to="/Task">Tasks</Link>
//             <Link to="/GuestPage">Invitation and guest list</Link>
//             <button onClick={handleLogout} className="logout-btn">
//                 Logout
//             </button>
//         </div>
//     );
// };

// export default ActionButtons;
import React from "react";
import "../../../components/UserProfileSection/ActionButtons/ActionButtons.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearError} from "../../../Redux/Action";

const ActionButtons = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.login);
    const handleLogout = () => {
        dispatch(clearError()); 
        dispatch(logout());
    
        setTimeout(() => {
            navigate("/");
        }, 1000);
    };
    

    return (
        <div className="action-buttons">
            <Link to="/Task">Tasks</Link>
            <Link to="/GuestPage">Invitation and guest list</Link>

            <button onClick={handleLogout} className="logout-btn" disabled={loading}>
                {loading ? (
                    <div className="spinner-border custom-spinner" />
                ) : (
                    "Logout"
                )}
            </button>
        </div>
    );
};

export default ActionButtons;
