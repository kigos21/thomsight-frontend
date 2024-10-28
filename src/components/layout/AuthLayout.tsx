import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

import styles from "./AuthLayout.module.scss";

export default function AuthRoot() {
  // const { user } = useUser();
  // const navigate = useNavigate();

  // if (!user) navigate("/companies");

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
