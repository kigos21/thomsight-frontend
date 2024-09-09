import styles from "./ReportsReviews.module.scss";
import ReportsTable from "../../components/ui/reports/ReportsTable";
import { IconCheck, IconPointFilled, IconX } from "@tabler/icons-react";

const ReportsReviews = () => {
  return (
    <div>
      <h1 className={styles.heading}>Reviews</h1>

      <ReportsTable>
        {[1, 3].map(() => (
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.postDetailsHeading}>
                <p className={styles.postDetailsName}>John Doe</p>
                <IconPointFilled size={8} />
                <p className={styles.postDetailsDate}>09/09/2024</p>
              </div>
              <p className={styles.postDetailsRating}>Rating: 5.0</p>
              <p className={styles.postDetailsBody}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempora, nam animi veritatis porro cupiditate molestias aliquam
                magnam, corrupti dolorum nostrum delectus pariatur! Similique
              </p>
            </div>
            <div className={styles.col}>
              <div className={styles.reportDetailsHeading}>
                <p className={styles.reportDetailsName}>John Doe</p>
                <IconPointFilled size={8} />
                <p className={styles.reportDetailsDate}>09/09/2024</p>
              </div>
              <p className={styles.reportDetailsBody}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempora, nam animi veritatis porro cupiditate molestias aliquam
              </p>
            </div>
            <div className={styles.thirdCol}>
              <div className={styles.actionsButtonGroup}>
                <button className={styles.btnCheck}>
                  <IconCheck />
                </button>
                <button className={styles.btnDismiss}>
                  <IconX />
                </button>
              </div>
            </div>
          </div>
        ))}
      </ReportsTable>
    </div>
  );
};

export default ReportsReviews;
