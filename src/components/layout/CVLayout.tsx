import styles from "./CVLayout.module.scss";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import PaddedContainer from "./PaddedContainer";
import Button from "../ui/Button";
import {
  IconFileCheck,
  IconFilePencil,
  IconHelp,
  IconHourglassHigh,
  IconList,
  IconOutbound,
} from "@tabler/icons-react";
import SuccessMessage from "../form/SuccessMessage";
import { useEffect, useState } from "react";
import ValidationError from "../form/ValidationError";
import { useUser } from "../../contexts/UserContext";

const CVLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const successMessage = location.state?.successMessage;
  const { user } = useUser();

  useEffect(() => {
    setSuccess("");
    setError("");
  }, [location.pathname]);

  useEffect(() => {
    if (successMessage) {
      setSuccess(successMessage);
    }
  }, [successMessage]);

  const helpText =
    "Listing: posted CVs by the community \n" +
    "Pending: CVs sent to you for a review request \n" +
    "To Review: CVs to review \n" +
    "Reviewed: CVs reviewed \n" +
    "My Requests: Your CV review requests sent to others";

  const links: {
    path: string;
    name?: string;
    icon?: JSX.Element;
  }[] = [
    {
      path: "/cv-review",
      name: "Listing",
      icon: <IconList stroke={2} className={styles.bottomNavIcon} />,
    },
    {
      path: "/cv-review/pending",
      name: "Pending",
      icon: <IconHourglassHigh stroke={2} className={styles.bottomNavIcon} />,
    },
    {
      path: "/cv-review/to-review",
      name: "To Review",
      icon: <IconFilePencil stroke={2} className={styles.bottomNavIcon} />,
    },
    {
      path: "/cv-review/reviewed",
      name: "Reviewed",
      icon: <IconFileCheck stroke={2} className={styles.bottomNavIcon} />,
    },
    {
      path: "/cv-review/my-requests",
      name: "My Requests",
      icon: <IconOutbound stroke={2} className={styles.bottomNavIcon} />,
    },
  ];

  return (
    <div className={styles.rootLayout}>
      <div className={styles.sideNav}>
        <PaddedContainer>
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`${location.pathname === link.path && styles.activeLink}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </PaddedContainer>
      </div>

      <div className={styles.bottomNav}>
        <ul className={styles.bottomNavList}>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`${location.pathname === link.path && styles.bottomNavIconActive}`}
              >
                {link.icon && link.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <PaddedContainer classNames={styles.main}>
        <header className={styles.header}>
          <h1>
            CV and Resume Peer Review Center&nbsp;
            <IconHelp className={styles.helpIcon} title={helpText} />
          </h1>
          {location.pathname === "/cv-review" && (
            <Button
              color={"primary"}
              roundness={"rounded"}
              onClick={() => navigate("/cv-review/post-cv")}
            >
              Post CV
            </Button>
          )}
        </header>
        {success && <SuccessMessage message={success} />}
        {error && <ValidationError message={error} />}
        {/* MAIN CONTENT */}
        <Outlet context={{ setSuccess, setError }} />
      </PaddedContainer>
    </div>
  );
};

export default CVLayout;
