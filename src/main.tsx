import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import CompanyTokenPage from "./pages/company/CompanyTokenPage.tsx";
import CompanyRegisterPage from "./pages/auth/RegisterCompanyPage.tsx";
import PreLoginPage from "./pages/auth/PreLoginPage.tsx";
import LoginStudentPage from "./pages/auth/LoginStudentPage.tsx";
import UserHomePage from "./pages/home/UserHomePage.tsx";
import UserCompanyJobs from "./pages/company/UserCompanyJobs.tsx";
import UserCompanyInterviewTips from "./pages/company/UserCompanyInterviewTips.tsx";
import ProfileManagement from "./pages/profile/ProfileManagement.tsx";
import CVLayout from "./components/layout/CVLayout.tsx";
import CVGuidePage from "./pages/CVGuidePage.tsx";
import UserCompanyDiscussionForum from "./pages/company/UserCompanyDiscussionForum.tsx";
import InterviewGuidePage from "./pages/InterviewGuidePage.tsx";
import CVListing from "./pages/cv/CVListing.tsx";
import TermsAndConditions from "./pages/auth/TermsAndConditions.tsx";
import DataPrivacy from "./pages/DataPrivacy.tsx";
import UserCompanyOverview from "./pages/company/UserCompanyOverview.tsx";
import CVPending from "./pages/cv/CVPending.tsx";
import CVToReview from "./pages/cv/CVToReview.tsx";
import CVReviewed from "./pages/cv/CVReviewed.tsx";
import CVMyRequests from "./pages/cv/CVMyRequests.tsx";
import CVFeedbackCreate from "./pages/cv/CVFeedbackCreate.tsx";
import CVFeedbackView from "./pages/cv/CVFeedbackView.tsx";
import AdminGenerateTokenPage from "./pages/tokens/AdminGenerateTokenPage.tsx";
import AdminCompanyAccount from "./pages/tokens/AdminCompanyAccount.tsx";
import ReportsLayout from "./components/layout/ReportsLayout.tsx";
import ReportsDiscussion from "./pages/reports/ReportsDiscussion.tsx";
import CompanyNotification from "./pages/company/CompanyNotification.tsx";
import AdminViewAnnouncements from "./pages/announcements/AdminViewAnnouncements.tsx";
import CompanyManageInformationCompany from "./pages/company/CompanyManageInformationCompany.tsx";
import CompanyManageInformationJobs from "./pages/company/CompanyManageInformationJobs.tsx";
import AdminCreateAnnouncement from "./pages/announcements/AdminCreateAnnouncement.tsx";
import ReportsReviews from "./pages/reports/ReportsReviews.tsx";
import ReportsInterviewTips from "./pages/reports/ReportsInterviewTips.tsx";
import ReportForm from "./components/ui/company/ReportForm.tsx";
import DeletePopUp from "./components/ui/company/DeletePopUp.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Home
      {
        index: true,
        element: <UserHomePage />,
      },

      // Announcements
      {
        path: "announcements",
        element: <AdminViewAnnouncements />,
      },
      {
        path: "announcements/create",
        element: <AdminCreateAnnouncement />,
      },

      // Company
      {
        path: "company",
        element: <CompanyLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={"overview"} replace />,
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
            path: "forum",
            element: <UserCompanyDiscussionForum />,
          },

          // Report Pop-up
          {
            path: "report",
            element: <ReportForm />,
          },
          // Delete Pop-up
          {
            path: "delete",
            element: <DeletePopUp />,
          },
          {
            path: "interview-tips",
            element: <UserCompanyInterviewTips />,
          },

          //company layout na maskonti laman navbar
          {
            path: "manage/info",
            element: <CompanyManageInformationCompany />,
          },
          {
            path: "manage/jobs",
            element: <CompanyManageInformationJobs />,
          },
        ],
      },

      // CV Guide
      {
        path: "cv-guide",
        element: <CVGuidePage />,
      },

      // Interview Guide
      {
        path: "interview-guide",
        element: <InterviewGuidePage />,
      },

      // Profile Management
      {
        path: "profile",
        element: <ProfileManagement />,
      },

      // Tokens
      {
        path: "tokens",
        element: <AdminGenerateTokenPage />,
      },
      {
        path: "tokens/companies",
        element: <AdminCompanyAccount />,
      },

      // Reports
      {
        path: "reports",
        element: <ReportsLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={"discussion"} replace />,
          },
          {
            path: "discussion",
            element: <ReportsDiscussion />,
          },
          {
            path: "reviews",
            element: <ReportsReviews />,
          },
          {
            path: "interview-tips",
            element: <ReportsInterviewTips />,
          },
        ],
      },

      // CV Review
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

      // Notifications
      {
        path: "/notifications",
        element: <CompanyNotification />,
      },
    ],
  },

  /**
   * AUTH GROUP
   */
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
