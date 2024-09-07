import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { IoSchool } from "react-icons/io5";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [letter, setLetter] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getUserName();
  }, []);

  const getUserName = () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    setLetter(userData.firstName.toUpperCase().slice(0, 1));
  };
  return (
    <div className={styles.Navbar}>
      <div className={styles.logo}>
        <IoSchool size={26} />
        <span>Learning Management System</span>
      </div>
      <div className={styles.logOut}>
        <Avatar
          sx={{ color: "#000", fontWeight: 700, fontSize: 22 }}
          title="log out"
          onClick={() => {
            localStorage.clear()
            navigate("/");
          }}
        >
          {letter}
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
