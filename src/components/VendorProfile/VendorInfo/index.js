import React, { useState } from "react";
import { User } from "lucide-react";
import "./VendorInfo.css";

const VendorInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Name Placeholder");
  const [email, setEmail] = useState("email@placeholder.com");
  const [password, setPassword] = useState("********");

  const handleEditSave = () => {
    if (isEditing) {
      alert("Profile updated successfully!");
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="vendor-profile-card">
      <div className="vendor-icon">
        <User className="icon-style" size={120} strokeWidth={1} />
      </div>
      <div className="vendor-info-fields">
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            className={!isEditing ? "disabled" : ""}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
            className={!isEditing ? "disabled" : ""}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!isEditing}
            className={!isEditing ? "disabled" : ""}
          />
        </div>
      </div>
      <div className="edit-btn">
        <button onClick={handleEditSave}>{isEditing ? "Save" : "Edit"}</button>
      </div>
    </div>
  );
};

export default VendorInfo;
