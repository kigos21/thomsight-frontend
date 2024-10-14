import styles from "./LandingPage.module.scss";

import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <PaddedContainer classNames={styles.background}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.heading}>
            <h1>
              Learn, Explore, and Discover Internship Opportunities and
              Resources for UST-CICS Students!
            </h1>
            <p>
              Gain access to exclusive UST-CICS internship opportunities, expert
              advice from alumni, and all the tools you need to prepare for your
              career journey—all in one platform.
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <Link to="/login">
              <Button
                color="secondary"
                roundness="sm-rounded"
                classNames={styles.button}
                type="button"
              >
                LOGIN NOW!
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.rightContainer}></div>
      </div>
    </PaddedContainer>
  );
};

export default LandingPage;
