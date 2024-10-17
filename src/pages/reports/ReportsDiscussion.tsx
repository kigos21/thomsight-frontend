import { IconCheck, IconPointFilled, IconX } from "@tabler/icons-react";
import ReportsTable from "../../components/ui/reports/ReportsTable";
import styles from "./ReportsDiscussion.module.scss";

const ReportsDiscussion = () => {
  return (
    <div>
      <h1 className={styles.heading}>Discussion</h1>

      <ReportsTable>
        {[1, 2, 3].map(() => (
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.postDetailsHeading}>
                <p className={styles.postDetailsName}>John Doe</p>
                <IconPointFilled size={8} />
                <p className={styles.postDetailsDate}>09/09/2024</p>
              </div>
              <p className={styles.postDetailsBody}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tempora, nam animi veritatis porro cupiditate molestias aliquam
                magnam, corrupti dolorum nostrum delectus pariatur! Similique
                velit aperiam enim unde minus tenetur esse blanditiis laborum
                praesentium iure consectetur aspernatur soluta eligendi
                repudiandae pariatur aut sint eveniet incidunt, quos, sit iste
                nemo eaque labore eos? Placeat sunt tenetur dignissimos
                obcaecati eum, quasi nihil eos voluptatibus? Cum voluptate,
                perferendis quaerat minus, ea voluptas itaque repudiandae eius
                labore voluptatum quos sunt omnis temporibus! Earum mollitia ea
                consectetur delectus tempora molestiae voluptas animi amet
                facere iure molestias assumenda sapiente repudiandae suscipit
                quasi dicta, voluptatum dolorum et sequi.
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
                magnam, corrupti dolorum nostrum delectus pariatur! Similique
                velit aperiam enim unde minus tenetur esse blanditiis laborum
                praesentium iure consectetur aspernatur soluta eligendi
                repudiandae pariatur aut sint eveniet incidunt, quos, sit iste
                nemo eaque labore eos? Placeat sunt tenetur dignissimos
                obcaecati eum, quasi nihil eos voluptatibus? Cum voluptate,
                perferendis quaerat minus, ea voluptas itaque repudiandae eius
                labore voluptatum quos sunt omnis temporibus! Earum mollitia ea
                consectetur delectus tempora molestiae voluptas animi amet
                facere iure molestias assumenda sapiente repudiandae suscipit
                quasi dicta, voluptatum dolorum et sequi.
              </p>
            </div>
            <div className={styles.thirdCol}>
              <div className={styles.actionsButtonGroup}>
                <button className={styles.btnCheck}>
                  <IconCheck className={styles.iconCheck} />
                </button>
                <button className={styles.btnDismiss}>
                  <IconX className={styles.iconX} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </ReportsTable>
    </div>
  );
};

export default ReportsDiscussion;
