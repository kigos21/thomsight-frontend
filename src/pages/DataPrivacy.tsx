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

export default DataPrivacy;
