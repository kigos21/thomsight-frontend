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
import UserCompanyJobs from "./pages/auth/UserCompanyJobs.tsx";
import UserCompanyInterviewTips from "./pages/auth/UserCompanyInterviewTips.tsx";
import ProfileManagement from "./pages/auth/ProfileManagement.tsx";
import CVLayout from "./components/layout/CVLayout.tsx";
import CVGuidePage from "./pages/auth/CVGuidePage.tsx";
import UserCompanyDiscussionForum from "./pages/auth/UserCompanyDiscussionForum.tsx";
import InterviewTipsPage from "./pages/auth/InterviewTipsPage.tsx";
import CVListing from "./pages/cv/CVListing.tsx";
import TermsAndConditions from "./pages/auth/TermsAndConditions.tsx";
import DataPrivacy from "./pages/auth/DataPrivacy.tsx";
import UserCompanyOverview from "./pages/auth/UserCompanyOverview.tsx";
import CVPending from "./pages/cv/CVPending.tsx";
import CVToReview from "./pages/cv/CVToReview.tsx";
import CVReviewed from "./pages/cv/CVReviewed.tsx";
import CVMyRequests from "./pages/cv/CVMyRequests.tsx";
import CVFeedbackCreate from "./pages/cv/CVFeedbackCreate.tsx";
import CVFeedbackView from "./pages/cv/CVFeedbackView.tsx";
import GenerateTokenPage from "./pages/auth/GenerateTokenPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserHomePage />,
      },
      {
        path: "profilemanagement",
        element: <ProfileManagement />,
      },
      {
        path: "profilemanagement",
        element: <ProfileManagement />,
      },
      {
        path: "cv-guide",
        element: <CVGuidePage />,
      },
      {
        path: "interview-tips",
        element: <InterviewTipsPage />,
      },
      {
        path: "generate-token",
        element: <GenerateTokenPage />,
      },
      {
        path: "company",
        element: <CompanyLayout />,
        children: [
          {
            index: true,
            element: <h1>This is the Overview</h1>,
          },
          {
            path: "overview",
            element: <UserCompanyOverview />,
          },
          {
            path: "jobs",
            element: <UserCompanyJobs />,
          },
          {
            path: "discussion-forum",
            element: <UserCompanyDiscussionForum />,
          },
          {
            path: "interview-tips",
            element: <UserCompanyInterviewTips />,
          },
        ],
      },

      // CV Peer Review
      {
        path: "cv-review",
        element: <CVLayout />,
        children: [
          {
            index: true,
            element: <CVListing />,
          },
          {
            path: "pending",
            element: <CVPending />,
          },
          {
            path: "to-review",
            element: <CVToReview />,
          },
          {
            path: "reviewed",
            element: <CVReviewed />,
          },
          {
            path: "my-requests",
            element: <CVMyRequests />,
          },
          {
            path: ":reviewId",
            element: <CVFeedbackCreate />,
          },
          {
            path: "view/:reviewId",
            element: <CVFeedbackView />,
          },
        ],
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
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/data-privacy",
        element: <DataPrivacy />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
