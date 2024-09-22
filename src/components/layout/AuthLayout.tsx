import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

import styles from "./AuthLayout.module.scss";

export default function AuthRoot() {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
