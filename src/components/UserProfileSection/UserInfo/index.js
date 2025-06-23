import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../Redux/Action";
import "./UserInfo.css";

const UserInfo = () => {
    const user = useSelector((state) => state.login.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) {
        setName(user.username || "");
        setEmail(user.email || "");
        } else {
        alert("Please log in first");
        window.location.href = "/";
        }
    }, [user]);

    const handleEditSave = async () => {
            if (isEditing) {
            try {
                const updatedData = {
                id: user.id,
                username: name,
                email,
                };
        
                if (password) updatedData.password = password;
        
                const token = localStorage.getItem("token"); 
        
                const res = await axios.post(
                "http://localhost/route2/project/api/profile/update.php",
                updatedData,
                {
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                    },
                }
                );
        
                if (res.data.success) {
                alert("✅ Profile updated successfully!");
                dispatch(updateUser({ username: name, email }));
                } else {
                alert("❌ Failed to update profile");
                }
            } catch (error) {
                alert("❌ Error occurred while updating profile");
                console.error(error);
            }
            }
        
            setIsEditing(!isEditing);
        };
        

    return (
        <div className="user-info-card">
        <div className="user-icon">
            <User className="icon-style" size={100} strokeWidth={1} />
        </div>

        <div className="user-info-fields">
            <div className="field">
            <label htmlFor="name">Username</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className={isEditing ? "editable" : "disabled"}
            />
            </div>

            <div className="field">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className={isEditing ? "editable" : "disabled"}
            />
            </div>

            <div className="field">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                placeholder="Leave blank to keep current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isEditing}
                className={isEditing ? "editable" : "disabled"}
            />
            </div>
        </div>

        <div className="edit-btn">
            <button onClick={handleEditSave}>
            {isEditing ? "Save" : "Edit"}
            </button>
        </div>
        </div>
    );
};

export default UserInfo;
