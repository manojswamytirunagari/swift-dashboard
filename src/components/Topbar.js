import React, { useEffect, useState } from "react";
import "./Topbar.css";

const Topbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="topbar">
      <div className="topbar-left">
        <img src="/swift-logo.jpg" alt="SWIFT" className="swift-logo" />
      </div>
      <div className="topbar-right">
        <div className="user-avatar">{initials}</div>
        <span className="user-name">{user.name}</span>
      </div>
    </div>
  );
};

export default Topbar;
