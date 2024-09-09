import { IconHelp } from "@tabler/icons-react";
import styles from "./ReportsTable.module.scss";

interface ReportsTableProps {
  children: React.ReactNode;
}

const help =
  "Check button resolves the issue by deleting the reported content.\n" +
  "Cross mark button ignores the issue and removes it from this list.";

const ReportsTable: React.FC<ReportsTableProps> = ({ children }) => {
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

        {children}
      </div>
    </div>
  );
};

export default ReportsTable;
