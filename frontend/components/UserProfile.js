"use client";

import { logout } from "@/services";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    setUser(user);
  }, []);

  const handleLogout = async () => {
    const result = await logout();
    localStorage.removeItem("user");
    setUser("");
    location.href = "/login";
  };

  if (!user) {
    return <div></div>;
  }

  return (
    <div>
      {user && user.email}
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}
