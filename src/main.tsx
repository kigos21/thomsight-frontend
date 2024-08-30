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
import CompanyRegisterPage from "./pages/auth/CompanyRegisterPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: "",
      },
    ],
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
        path: "/register/token",
        element: <CompanyTokenPage />,
      },

      {
        // TODO: company must be a protected route, a link which should be
        // clicked from email
        path: "/register/company",
        element: <CompanyRegisterPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordEmail />,
      },
      {
        path: "/forgot-password/change-password",
        element: <ForgotPasswordChangePassword />,
      },
      // {
      //   path: "/terms-and-conditions",
      //   element: <TermsAndConditionsPage />,
      // },
      // {
      //   path: "/data-privacy",
      //   element: <DataPrivacyPage />,
      // },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
