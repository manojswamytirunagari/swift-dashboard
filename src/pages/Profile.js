import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));
  }, []);

  if (!user) return <p>Loading...</p>;

  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div>
      {/* Topbar */}
      <div className="topbar">
        <img src="/swift-logo.png" alt="SWIFT" className="swift-logo" />
        <div className="topbar-right">
          <div className="profile-avatar">{getInitials(user.name)}</div>
          <div className="profile-name">{user.name}</div>
        </div>
      </div>

      {/* Content */}
      <div className="main-content">
        <h2 className="page-header">
          <button className="dashboardbutton" onClick={() => navigate("/dashboard")}>←</button>
          <span>Welcome, {user.name}</span>
        </h2>

        <div className="profile-container">
          {/* Avatar + Name/Email */}
          <div className="profile-top-row">
            <div className="profile-avatar-main">{getInitials(user.name)}</div>
            <div className="profile-name-email">
              <div className="profile-name-large">{user.name}</div>
              <div className="profile-email">{user.email}</div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="profile-info-grid">
            {[
              { label: "User ID", value: user.id },
              { label: "Name", value: user.name },
              { label: "Email", value: user.email },
              { label: "Phone", value: user.phone },
            ].map((item, i) => (
              <div className="profile-field-group" key={i}>
                <label className="field-title">{item.label}</label>
                <div className="profile-field">{item.value}</div>
              </div>
            ))}

            <div className="profile-field-group full-width">
              <label className="field-title">Address</label>
              <div className="profile-field">
                {user.address.street}, {user.address.city}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
