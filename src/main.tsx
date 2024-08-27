import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import AppLayout from "./components/layout/AppLayout.tsx";
import AuthLayout from "./components/layout/AuthLayout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import PreRegisterPage from "./pages/auth/PreRegister.tsx";
import StudentRegisterPage from "./pages/auth/StudentRegisterPage.tsx";
import AlumniRegisterPage from "./pages/auth/AlumniRegisterPage.tsx";
import ForgotPasswordEmail from "./pages/auth/ForgotPasswordEmail.tsx";
import ForgotPasswordChangePassword from "./pages/auth/ForgotPasswordChangePassword.tsx";
import CompanyTokenPage from "./pages/auth/CompanyTokenPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/register",
        element: <PreRegisterPage />,
      },
      {
        path: "/register/student",
        element: <StudentRegisterPage />,
      },
      {
        path: "/register/alumni",
        element: <AlumniRegisterPage />,
      },
      {
        path: "/forgotpassword/email",
        element: <ForgotPasswordEmail />,
      },
      {
        path: "/forgotpassword/changepassword",
        element: <ForgotPasswordChangePassword />,
      },
      {
        path: "/company/tokenpage",
        element: <CompanyTokenPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
