import {
  IconCheck,
  IconHelp,
  IconPointFilled,
  IconX,
} from "@tabler/icons-react";
import styles from "./ReportsTable.module.scss";

interface ReportsTableProps {
  rows: Array<{ col1: string; col2: string; col3: string }>;
}

const help =
  "Check button resolves the issue by deleting the reported content.\n\nCross mark button ignores the issue and removes it from this list.";

const ReportsTable: React.FC<ReportsTableProps> = () => {
  return (
    <div className={styles.scrollOverflow}>
      <div className={styles.table}>
        <div className={styles.tableHeading}>
          <div className={styles.col}>Post Details</div>
          <div className={styles.col}>Report Details</div>
          <div className={`${styles.actionHeading} ${styles.thirdCol}`}>
            Actions <IconHelp className={styles.iconHelp} title={help} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.postDetailsHeading}>
              <p className={styles.postDetailsName}>John Doe</p>
              <IconPointFilled size={8} />
              <p className={styles.postDetailsDate}>09/09/2024</p>
            </div>
            <p className={styles.postDetailsBody}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
              nam animi veritatis porro cupiditate molestias aliquam magnam,
              corrupti dolorum nostrum delectus pariatur! Similique velit
              aperiam enim unde minus tenetur esse blanditiis laborum
              praesentium iure consectetur aspernatur soluta eligendi
              repudiandae pariatur aut sint eveniet incidunt, quos, sit iste
              nemo eaque labore eos? Placeat sunt tenetur dignissimos obcaecati
              eum, quasi nihil eos voluptatibus? Cum voluptate, perferendis
              quaerat minus, ea voluptas itaque repudiandae eius labore
              voluptatum quos sunt omnis temporibus! Earum mollitia ea
              consectetur delectus tempora molestiae voluptas animi amet facere
              iure molestias assumenda sapiente repudiandae suscipit quasi
              dicta, voluptatum dolorum et sequi.
            </p>
          </div>
          <div className={styles.col}>
            <div className={styles.reportDetailsHeading}>
              <p className={styles.reportDetailsName}>John Doe</p>
              <IconPointFilled size={8} />
              <p className={styles.reportDetailsDate}>09/09/2024</p>
            </div>
            <p className={styles.reportDetailsBody}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
              nam animi veritatis porro cupiditate molestias aliquam magnam,
              corrupti dolorum nostrum delectus pariatur! Similique velit
              aperiam enim unde minus tenetur esse blanditiis laborum
              praesentium iure consectetur aspernatur soluta eligendi
              repudiandae pariatur aut sint eveniet incidunt, quos, sit iste
              nemo eaque labore eos? Placeat sunt tenetur dignissimos obcaecati
              eum, quasi nihil eos voluptatibus? Cum voluptate, perferendis
              quaerat minus, ea voluptas itaque repudiandae eius labore
              voluptatum quos sunt omnis temporibus! Earum mollitia ea
              consectetur delectus tempora molestiae voluptas animi amet facere
              iure molestias assumenda sapiente repudiandae suscipit quasi
              dicta, voluptatum dolorum et sequi.
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
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.postDetailsHeading}>
              <p className={styles.postDetailsName}>John Doe</p>
              <IconPointFilled size={8} />
              <p className={styles.postDetailsDate}>09/09/2024</p>
            </div>
            <p className={styles.postDetailsBody}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
              nam animi veritatis porro cupiditate m
            </p>
          </div>
          <div className={styles.col}>
            <div className={styles.reportDetailsHeading}>
              <p className={styles.reportDetailsName}>John Doe</p>
              <IconPointFilled size={8} />
              <p className={styles.reportDetailsDate}>09/09/2024</p>
            </div>
            <p className={styles.reportDetailsBody}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
              nam animi veritatis porro cupiditate molestias aliquam magnam,
              corrupti dolorum nostrum delectus pariatur! Similique velit
              aperiam enim unde minus tenetur esse blanditiis laborum
              praesentium iure consectetur aspernatur soluta eligendi
              repudiandae pariatur aut sint eveniet incidunt, quos, sit iste
              nemo eaque labore eos? Placeat sunt tenetur dignissimos obcaecati
              eum, quasi nihil eos voluptatibus? Cum voluptate, perferendis
              quaerat minus, ea voluptas itaque repudiandae eius labore
              voluptatum quos sunt omnis temporibus! Earum mollitia ea
              consectetur delectus tempora molestiae voluptas animi amet facere
              iure molestias assumenda sapiente repudiandae suscipit quasi
              dicta, voluptatum dolorum et sequi.
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
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.postDetailsHeading}>
              <p className={styles.postDetailsName}>John Doe</p>
              <IconPointFilled size={8} />
              <p className={styles.postDetailsDate}>09/09/2024</p>
            </div>
            <p className={styles.postDetailsBody}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
              nam animi veritatis porro cupiditate molestias aliquam magnam,
              corrupti dolorum nostrum delectus pariatur! Similique velit
              aperiam enim unde minus tenetur esse blanditiis laborum
              praesentium iure consectetur aspernatur soluta eligendi
              repudiandae pariatur aut sint eveniet incidunt, quos, sit iste
              nemo eaque labore eos? Placeat sunt tenetur dignissimos obcaecati
              eum, quasi nihil eos voluptatibus? Cum voluptate, perferendis
              quaerat minus, ea voluptas itaque repudiandae eius labore
              voluptatum quos sunt omnis temporibus! Earum mollitia ea
              consectetur delectus tempora molestiae voluptas animi amet facere
              iure molestias assumenda sapiente repudiandae suscipit quasi
              dicta, voluptatum dolorum et sequi.
            </p>
          </div>
          <div className={styles.col}>
            <div className={styles.reportDetailsHeading}>
              <p className={styles.reportDetailsName}>John Doe</p>
              <IconPointFilled size={8} />
              <p className={styles.reportDetailsDate}>09/09/2024</p>
            </div>
            <p className={styles.reportDetailsBody}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,
              nam animi veritatis porro cupiditate molestias aliquam magnam,
              corrupti dolorum nostrum delectus pariatur! Similique velit
              aperiam enim unde minus tenetur esse blanditiis laborum
              praesentium iure consectetur aspernatur soluta e
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
      </div>
    </div>
  );
};

export default ReportsTable;
