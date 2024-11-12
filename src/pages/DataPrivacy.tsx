import styles from "./DataPrivacy.module.scss";

import PaddedContainer from "../components/layout/PaddedContainer";
import AuthContentContainer from "../components/ui/auth/AuthContentContainer";

const DataPrivacy = () => {
  return (
    <PaddedContainer classNames={styles.background}>
      <AuthContentContainer>
        <div className={styles.textContainer}>
          <h1>Data Privacy Policy</h1>
          <p>
            We are committed to protecting your personal information and your
            right to privacy. This Data Privacy Policy explains what information
            we collect, how we use it, and what rights you have in relation to
            it.
          </p>
          <div className={styles.contentHolder}>
            <h2>Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when registering on the platform, such as your name, email
              address, student number, alumni number, and any other information
              you choose to provide.
            </p>
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, operate, and
              maintain our services, improve and personalize your experience,
              communicate with you, and for security and fraud prevention.
            </p>
            <h2>Sharing Your Information</h2>
            <p>
              We do not share your personal information with third parties
              except to comply with the law, develop our products, or protect
              our rights.
            </p>
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect the security of your personal information. However, please
              also remember that we cannot guarantee that the internet itself is
              100% secure.
            </p>
            <h2>Your Privacy Rights</h2>
            <p>
              You have the right to request access to the personal information
              we collect from you, change that information, or delete it. To
              exercise these rights, please contact us.
            </p>
            <h2>Changes to This Policy</h2>
            <p>
              We may update this Data Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on our
              platform.
            </p>
            <h2>Contact Us</h2>
          </div>
          <p>
            If you have questions or comments about this policy, you may contact
            us at "thomsight2024@gmail.com".
          </p>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
};

export default DataPrivacy;
