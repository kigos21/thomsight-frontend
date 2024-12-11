/* eslint-disable react-refresh/only-export-components */
import { lazy, StrictMode, Suspense } from "react";
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
// import RegisterAlumniPage from "./pages/auth/RegisterAlumniPage.tsx";
import ForgotPasswordEmail from "./pages/auth/ForgotPasswordEmail.tsx";
// import ForgotPasswordChangePassword from "./pages/auth/ForgotPasswordChangePassword.tsx";
import CompanyTokenPage from "./pages/company/CompanyTokenPage.tsx";
// import CompanyRegisterPage from "./pages/auth/RegisterCompanyPage.tsx";
import LoginStudentPage from "./pages/auth/LoginStudentPage.tsx";
import UserHomePage from "./pages/home/UserHomePage.tsx";
import UserCompanyJobs from "./pages/company/UserCompanyJobs.tsx";
import UserCompanyInterviewTips from "./pages/company/UserCompanyInterviewTips.tsx";
// import ProfileManagement from "./pages/profile/ProfileManagement.tsx";
import CVLayout from "./components/layout/CVLayout.tsx";
import CVGuidePage from "./pages/CVGuidePage.tsx";
import UserCompanyDiscussionForum from "./pages/company/UserCompanyDiscussionForum.tsx";
import InterviewGuidePage from "./pages/InterviewGuidePage.tsx";
import CVListing from "./pages/cv/CVListing.tsx";
// import TermsAndConditions from "./pages/auth/TermsAndConditions.tsx";
// import DataPrivacy from "./pages/DataPrivacy.tsx";
import UserCompanyOverview from "./pages/company/UserCompanyOverview.tsx";
// import CVPending from "./pages/cv/CVPending.tsx";
// import CVToReview from "./pages/cv/CVToReview.tsx";
// import CVReviewed from "./pages/cv/CVReviewed.tsx";
// import CVMyRequests from "./pages/cv/CVMyRequests.tsx";
// import CVFeedbackCreate from "./pages/cv/CVFeedbackCreate.tsx";
// import CVFeedbackView from "./pages/cv/CVFeedbackView.tsx";
import AdminGenerateTokenPage from "./pages/tokens/AdminGenerateTokenPage.tsx";
import AdminCompanyAccount from "./pages/tokens/AdminCompanyAccount.tsx";
import ReportsLayout from "./components/layout/ReportsLayout.tsx";
import ReportsDiscussion from "./pages/reports/ReportsDiscussion.tsx";
// import CompanyNotification from "./pages/company/CompanyNotification.tsx";
import AdminViewAnnouncements from "./pages/announcements/AdminViewAnnouncements.tsx";
// import CompanyManageInformationCompany from "./pages/company/CompanyManageInformationCompany.tsx";
// import CompanyManageInformationJobs from "./pages/company/CompanyManageInformationJobs.tsx";
// import AdminCreateAnnouncement from "./pages/announcements/AdminCreateAnnouncement.tsx";
import ReportsReviews from "./pages/reports/ReportsReviews.tsx";
import ReportsInterviewTips from "./pages/reports/ReportsInterviewTips.tsx";
// import LoginExternalPage from "./pages/auth/LoginExternalPage.tsx";
import LandingPage from "./pages/auth/LandingPage.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import PrivateRoute from "./contexts/PrivateRoute.tsx";
import { CompaniesProvider } from "./contexts/CompaniesContext.tsx";
import { TokenProvider } from "./contexts/TokenContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthenticatedContext.tsx";
import PostCVForm from "./pages/cv/PostCVForm.tsx";
// import ChangePassword from "./pages/profile/ChangePassword.tsx";
// import FAQsPage from "./pages/faqs/FAQsPage.tsx";
import ReportsComments from "./pages/reports/ReportsComments.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavProvider } from "./contexts/NavContext.tsx";
// import DisplayProfile from "./components/ui/company/DisplayProfile.tsx";

// Profile Management
const ProfileManagement = lazy(
  () => import("./pages/profile/ProfileManagement.tsx")
);
const ChangePassword = lazy(() => import("./pages/profile/ChangePassword.tsx"));

// CV Review Components
const CVPending = lazy(() => import("./pages/cv/CVPending.tsx"));
const CVToReview = lazy(() => import("./pages/cv/CVToReview.tsx"));
const CVReviewed = lazy(() => import("./pages/cv/CVReviewed.tsx"));
const CVMyRequests = lazy(() => import("./pages/cv/CVMyRequests.tsx"));
const CVFeedbackCreate = lazy(() => import("./pages/cv/CVFeedbackCreate.tsx"));
const CVFeedbackView = lazy(() => import("./pages/cv/CVFeedbackView.tsx"));

// Company Management
const CompanyManageInformationCompany = lazy(
  () => import("./pages/company/CompanyManageInformationCompany.tsx")
);
const CompanyManageInformationJobs = lazy(
  () => import("./pages/company/CompanyManageInformationJobs.tsx")
);

// Auth Pages
const RegisterAlumniPage = lazy(
  () => import("./pages/auth/RegisterAlumniPage.tsx")
);
const RegisterCompanyPage = lazy(
  () => import("./pages/auth/RegisterCompanyPage.tsx")
);
const ForgotPasswordChangePassword = lazy(
  () => import("./pages/auth/ForgotPasswordChangePassword.tsx")
);

// Additional Pages
const TermsAndConditions = lazy(
  () => import("./pages/auth/TermsAndConditions.tsx")
);
const DataPrivacy = lazy(() => import("./pages/DataPrivacy.tsx"));
const FAQsPage = lazy(() => import("./pages/faqs/FAQsPage.tsx"));
const CompanyNotification = lazy(
  () => import("./pages/company/CompanyNotification.tsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <CompaniesProvider>
          <NavProvider>
            <PrivateRoute element={<AppLayout />} />
          </NavProvider>
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
          <Suspense fallback="Loading...">
            <PrivateRoute
              element={<AdminViewAnnouncements />}
              allowedRoles={["Admin", "Rep"]}
            />
          </Suspense>
        ),
      },
      // {
      //   path: "announcements/create",
      //   element: (
      //     <Suspense fallback="Loading...">
      //       <PrivateRoute
      //         element={<AdminCreateAnnouncement />}
      //         allowedRoles={["Admin"]}
      //       />
      //     </Suspense>
      //   ),
      // },

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
              <Suspense fallback="Loading...">
                <PrivateRoute
                  element={<CompanyManageInformationCompany />}
                  allowedRoles={["Rep"]}
                />
              </Suspense>
            ),
          },
          {
            path: "manage/jobs",
            element: (
              <Suspense fallback="Loading...">
                <PrivateRoute
                  element={<CompanyManageInformationJobs />}
                  allowedRoles={["Rep"]}
                />
              </Suspense>
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
      // FAQs
      {
        path: "faqs",
        element: (
          <Suspense fallback="Loading...">
            <FAQsPage />
          </Suspense>
        ),
      },
      // Profile Management
      {
        path: "profile",
        element: (
          <Suspense fallback="Loading...">
            <ProfileManagement />
          </Suspense>
        ),
      },
      {
        path: "/profile/change-password/",
        element: (
          <Suspense fallback="Loading...">
            <ChangePassword />
          </Suspense>
        ),
      },
      // Tokens
      {
        path: "tokens",
        element: (
          <Suspense fallback="Loading...">
            <PrivateRoute
              element={<AdminGenerateTokenPage />}
              allowedRoles={["Admin"]}
            />
          </Suspense>
        ),
      },
      {
        path: "company-accounts",
        element: (
          <Suspense fallback="Loading...">
            <PrivateRoute
              element={<AdminCompanyAccount />}
              allowedRoles={["Admin"]}
            />
          </Suspense>
        ),
      },

      // Reports
      {
        path: "reports",
        element: (
          <Suspense fallback="Loading...">
            <PrivateRoute
              element={<ReportsLayout />}
              allowedRoles={["Admin"]}
            />
          </Suspense>
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
              <Suspense fallback="Loading...">
                <PrivateRoute
                  element={<CVPending />}
                  allowedRoles={["Student"]}
                />
              </Suspense>
            ),
          },
          {
            path: "to-review",
            element: (
              <Suspense fallback="Loading...">
                <CVToReview />
              </Suspense>
            ),
          },
          {
            path: "reviewed",
            element: (
              <Suspense fallback="Loading...">
                <CVReviewed />
              </Suspense>
            ),
          },
          {
            path: "my-requests",
            element: (
              <Suspense fallback="Loading...">
                <CVMyRequests />
              </Suspense>
            ),
          },
          {
            path: ":cvId",
            element: (
              <Suspense fallback="Loading...">
                <CVFeedbackCreate />
              </Suspense>
            ),
          },
          {
            path: "view/:reviewId",
            element: (
              <Suspense fallback="Loading...">
                <CVFeedbackView />
              </Suspense>
            ),
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
          <Suspense fallback="Loading...">
            <PrivateRoute
              element={<CompanyNotification />}
              allowedRoles={["Rep"]}
            />
          </Suspense>
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
        element: (
          <Suspense fallback="Loading...">
            <RegisterAlumniPage />
          </Suspense>
        ),
      },
      {
        path: "/register/token",
        element: <CompanyTokenPage />,
      },

      {
        // TODO: company must be a protected route, a link which should be
        // clicked from email
        path: "/register/company",
        element: (
          <Suspense fallback="Loading...">
            <RegisterCompanyPage />
          </Suspense>
        ),
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
      // {
      //   path: "/login/external",
      //   element: <LoginExternalPage />,
      // },

      /**
       * Others
       */
      {
        path: "/forgot-password",
        element: <ForgotPasswordEmail />,
      },
      {
        path: "/forgot-password/change-password/:token",
        element: (
          <Suspense fallback="Loading...">
            <ForgotPasswordChangePassword />
          </Suspense>
        ),
      },
      {
        path: "/terms-and-conditions",
        element: (
          <Suspense fallback="Loading...">
            <TermsAndConditions />
          </Suspense>
        ),
      },
      {
        path: "/data-privacy",
        element: (
          <Suspense fallback="Loading...">
            <DataPrivacy />
          </Suspense>
        ),
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
          fontFamily: "Poppins, sans-serif",
          color: "black",
          fontStyle: "bold",
        }}
      />
    </GoogleOAuthProvider>
  </StrictMode>
);
