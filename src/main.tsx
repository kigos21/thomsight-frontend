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
import LoginExternalPage from "./pages/auth/LoginExternalPage.tsx";
import LandingPage from "./pages/auth/LandingPage.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import PrivateRoute from "./contexts/PrivateRoute.tsx";
import { CompaniesProvider } from "./contexts/CompaniesContext.tsx";
import { TokenProvider } from "./contexts/TokenContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthenticatedContext.tsx";
import PostCVForm from "./pages/cv/PostCVForm.tsx";
import ChangePassword from "./pages/profile/ChangePassword.tsx";
import ReportsComments from "./pages/reports/ReportsComments.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import DisplayProfile from "./components/ui/company/DisplayProfile.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <CompaniesProvider>
          <PrivateRoute element={<AppLayout />} />
        </CompaniesProvider>
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      // Home
      {
        path: "companies",
        element: <UserHomePage />,
      },

      // Announcements
      {
        path: "announcements",
        element: (
          <PrivateRoute
            element={<AdminViewAnnouncements />}
            allowedRoles={["Admin", "Rep"]}
          />
        ),
      },
      {
        path: "announcements/create",
        element: (
          <PrivateRoute
            element={<AdminCreateAnnouncement />}
            allowedRoles={["Admin"]}
          />
        ),
      },

      // Company
      {
        path: "company/:slug",
        element: <CompanyLayout />,
        children: [
          // {
          //   index: true,
          //   element: <h1>This is the Overview</h1>,
          // },
          {
            // path: "overview",
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
          {
            path: "interview-tips",
            element: <UserCompanyInterviewTips />,
          },

          //company layout na maskonti laman navbar
          {
            path: "manage/info",
            element: (
              <PrivateRoute
                element={<CompanyManageInformationCompany />}
                allowedRoles={["Rep"]}
              />
            ),
          },
          {
            path: "manage/jobs",
            element: (
              <PrivateRoute
                element={<CompanyManageInformationJobs />}
                allowedRoles={["Rep"]}
              />
            ),
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
      {
        path: "/profile/change-password/",
        element: <ChangePassword />,
      },
      // Tokens
      {
        path: "tokens",
        element: (
          <PrivateRoute
            element={<AdminGenerateTokenPage />}
            allowedRoles={["Admin"]}
          />
        ),
      },
      {
        path: "company-accounts",
        element: (
          <PrivateRoute
            element={<AdminCompanyAccount />}
            allowedRoles={["Admin"]}
          />
        ),
      },

      // Reports
      {
        path: "reports",
        element: (
          <PrivateRoute element={<ReportsLayout />} allowedRoles={["Admin"]} />
        ),
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
            path: "comments",
            element: <ReportsComments />,
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
        element: (
          <PrivateRoute
            element={<CVLayout />}
            allowedRoles={["Student", "Alumni"]}
          />
        ),
        children: [
          {
            index: true,
            element: <CVListing />,
          },
          {
            path: "pending",
            element: (
              <PrivateRoute
                element={<CVPending />}
                allowedRoles={["Student"]}
              />
            ),
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
            path: ":cvId",
            element: <CVFeedbackCreate />,
          },
          {
            path: "view/:reviewId",
            element: <CVFeedbackView />,
          },
          {
            path: "post-cv",
            element: <PostCVForm />,
          },
        ],
      },

      // Notifications
      {
        path: "/notifications",
        element: (
          <PrivateRoute
            element={<CompanyNotification />}
            allowedRoles={["Rep"]}
          />
        ),
      },
    ],
  },

  /**
   * AUTH GROUP
   */
  {
    element: (
      <AuthProvider>
        <TokenProvider>
          <AuthLayout />
        </TokenProvider>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
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
      // {
      //   path: "/login",
      //   element: <PreLoginPage />,
      // },
      {
        path: "/login",
        element: <LoginStudentPage />,
      },
      {
        path: "/login/external",
        element: <LoginExternalPage />,
      },

      /**
       * Others
       */
      {
        path: "/forgot-password",
        element: <ForgotPasswordEmail />,
      },
      {
        path: "/forgot-password/change-password/:token",
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
      // {
      //   path: "/displayprofile",
      //   element: <DisplayProfile
      //               isVisible={true}
      //               onClose={() => {}}
      //               firstName="John Rupert"
      //               lastName="Azarias"
      //               bio="I am a software developer"
      //               profileLink="https://www.linkedin.com/in/john-rupert-azarias-93b1b1200/"
      //               phoneNumber="09123456789"
      //               email="johnrupertazarias@gmail.com"
      //            />,
      // },
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="107195282203-012nj9s8e4t16hgpefk8sovu08sc3ob1.apps.googleusercontent.com">
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        toastStyle={{
          fontSize: "15px",
          border: "2px solid #000",
          borderRadius: "8px",
        }}
      />
    </GoogleOAuthProvider>
  </StrictMode>
);
