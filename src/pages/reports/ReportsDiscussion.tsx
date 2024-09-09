import ReportsTable from "../../components/ui/reports/ReportsTable";
import styles from "./ReportsDiscussion.module.scss";

const ReportsDiscussion = () => {
  return (
    <div>
      <h1 className={styles.heading}>Discussion</h1>

      <div>
        <ReportsTable />
      </div>
    </div>
  );
};

export default ReportsDiscussion;
