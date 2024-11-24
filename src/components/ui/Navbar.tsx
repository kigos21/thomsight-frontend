import styles from "./Navbar.module.scss";

import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/thomsight-logo.svg";
import PaddedContainer from "../layout/PaddedContainer";
import Button from "./Button";
import RegisterWithDropdown from "./ButtonWithDropdown";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

export default function Navbar() {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  // Determine the base path
  const isRegisterRoute: boolean =
    location.pathname.startsWith("/register") ||
    location.pathname.startsWith("/thomsight");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/check");
        setLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  let button: JSX.Element;

  if (isRegisterRoute) {
    button = (
      <Link to={"/login"}>
        <Button
          color="secondary"
          roundness="rounded"
          classNames={styles.button}
        >
          Login
        </Button>
      </Link>
    );
  } else {
    button = <RegisterWithDropdown />;
  }

  return (
    <PaddedContainer style={{ marginBottom: "50px" }}>
      <nav className={styles.container}>
        <Link to="/" className={styles.headingLink}>
          <h1 className={styles.heading}>Thomsight</h1>
        </Link>
        <img src={logo} alt="Logo" className={styles.logo} />
        {loggedIn !== true && button}
      </nav>
    </PaddedContainer>
  );
}
