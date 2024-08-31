import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import AppLayout from "./components/layout/AppLayout.tsx";
import AuthLayout from "./components/layout/AuthLayout.tsx";
import CompanyLayout from "./components/layout/CompanyLayout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import PreRegisterPage from "./pages/auth/PreRegister.tsx";
import StudentRegisterPage from "./pages/auth/RegisterStudentPage.tsx";
import RegisterAlumniPage from "./pages/auth/RegisterAlumniPage.tsx";
import ForgotPasswordEmail from "./pages/auth/ForgotPasswordEmail.tsx";
import ForgotPasswordChangePassword from "./pages/auth/ForgotPasswordChangePassword.tsx";
import CompanyTokenPage from "./pages/auth/CompanyTokenPage.tsx";
import CompanyRegisterPage from "./pages/auth/RegisterCompanyPage.tsx";
import PreLoginPage from "./pages/auth/PreLoginPage.tsx";
import LoginStudentPage from "./pages/auth/LoginStudentPage.tsx";
import UserHomePage from "./pages/auth/UserHomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <UserHomePage />,
      },
    ],
  },
  {
    path: "/",
    element: <CompanyLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: "",
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      /**
       * Route group for Register
       */
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
        element: <RegisterAlumniPage />,
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

      /**
       * Route Group for Login
       */
      {
        path: "/login",
        element: <PreLoginPage />,
      },
      {
        path: "/login/student",
        element: <LoginStudentPage />,
      },

      /**
       * Others
       */
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
