import styles from "./LandingPage.module.scss";

import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import ImageCarousel from "../../components/ui/ImageCarousel";

const LandingPage = () => {
  return (
    <PaddedContainer classNames={styles.background}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.heading}>
            <h1>Learn and discover about internships now!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              color="secondary"
              roundness="sm-rounded"
              classNames={styles.button}
              type="submit"
            >
              REGISTER NOW!
            </Button>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <ImageCarousel />
        </div>
      </div>
    </PaddedContainer>
  );
};

export default LandingPage;
