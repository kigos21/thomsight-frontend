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
            Lorem ipsum dolor sit amet consectetur. Euismod quis vestibulum
            faucibus nibh integer est posuere enim facilisis. Mauris morbi eu
            massa blandit ac proin elementum consequat quis. Tristique malesuada
            nulla luctus massa. Lorem libero lobortis arcu id a sem ut sodales.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Euismod quis vestibulum
            faucibus nibh integer est posuere enim facilisis. Mauris morbi eu
            massa blandit ac proin elementum consequat quis. Tristique malesuada
            nulla luctus massa. Lorem libero lobortis arcu id a sem ut sodales.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Euismod quis vestibulum
            faucibus nibh integer est posuere enim facilisis. Mauris morbi eu
            massa blandit ac proin elementum consequat quis. Tristique malesuada
            nulla luctus massa. Lorem libero lobortis arcu id a sem ut sodales.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Euismod quis vestibulum
            faucibus nibh integer est posuere enim facilisis. Mauris morbi eu
            massa blandit ac proin elementum consequat quis. Tristique malesuada
            nulla luctus massa. Lorem libero lobortis arcu id a sem ut sodales.
          </p>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
};

export default TermsAndConditions;
