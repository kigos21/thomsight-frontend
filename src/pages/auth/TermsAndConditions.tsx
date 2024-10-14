import styles from "./TermsAndConditions.module.scss";

import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";

const TermsAndConditions = () => {
  return (
    <PaddedContainer classNames={styles.background}>
      <AuthContentContainer>
        <div className={styles.textContainer}>
          <h1>Terms & Conditions</h1>
          
          <p>
            Welcome to THOMSIGHT. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2>General Terms</h2>
          <p>
            These terms apply to all users, including CICS students, CICS alumni, company representatives, and the administrator (Technology Program Coordinator).
          </p>

          <h2>CICS Students</h2>
          <p>
            As a CICS student, you have access to a variety of resources designed to enhance your career readiness. This includes internship opportunities, expert advice from alumni, and tools to prepare for your career journey. You are expected to use these resources responsibly and maintain academic integrity.
          </p>

          <h2>CICS Alumni</h2>
          <p>
            As a CICS alumnus, you are encouraged to engage with the community through mentorship opportunities. You can also access career resources and contribute to the platform by sharing your professional experiences and insights on a specific company. Your participation helps foster a supportive environment for current students and fellow alumni.
          </p>

          <h2>Company Representatives</h2>
          <p>
            Company representatives can post job opportunities and interact with students and alumni. Ensure that all information provided is accurate and respectful.
          </p>

          <h2>Administrator (Technology Program Coordinator)</h2>
          <p>
            The Administrator is responsible for managing the platform and ensuring its security and integrity. The administrator has access to administrative tools and resources.
          </p>

          <h2>Privacy Policy</h2>
          <p>
            Please refer to our Privacy Policy for information on how we collect, use, and disclose your personal information.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content provided on our platform is the property of our organization or our licensors. You may not use, reproduce, or distribute any content without our permission.
          </p>

          <h2>Prohibited Activities</h2>
          <p>
            You may not use our services to engage in any illegal activities, distribute harmful content, or infringe on the rights of others.
          </p>

          <h2>Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to our services at any time, without notice, for conduct that we believe violates these terms or is harmful to other users.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We may update these terms from time to time. We will notify you of any changes by posting the new terms on our platform. Your continued use of the services after any changes indicates your acceptance of the new terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about these terms, please contact us at *email ng TPC?*.
          </p>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
};

export default TermsAndConditions;
