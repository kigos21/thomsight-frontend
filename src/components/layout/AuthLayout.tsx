import { Outlet } from "react-router-dom";
import Navbar from "../ui/auth/Navbar";

export default function AuthRoot() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
