import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout successful!");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
