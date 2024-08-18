import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import AppLayout from "./components/layout/AppLayout.tsx";
import AuthLayout from "./components/layout/AuthLayout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
