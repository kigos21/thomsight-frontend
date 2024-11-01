import styles from "./ReportsInterviewTips.module.scss";

import ReportsTable from "../../components/ui/reports/ReportsTable";
import { IconCheck, IconPointFilled, IconX } from "@tabler/icons-react";
import axiosInstance from "../../services/axiosInstance";
import { TipReport } from "../../types/types";
import { useEffect, useState } from "react";
import Spinner from "../../components/ui/Spinner";

const ReportsInterviewTips = () => {
  const [reports, setReports] = useState<TipReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get("/api/reports/tips");
        setReports(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <Spinner message="Fetching reports..." />;
  }

  return (
    <div>
      <h1 className={styles.heading}>Interview Tips</h1>

      <ReportsTable>
        {reports.map((report) => (
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.postDetailsHeading}>
                <p className={styles.postDetailsName}>{report.poster_name}</p>
                <IconPointFilled size={8} />
                <p className={styles.postDetailsDate}>{report.posted_date}</p>
              </div>
              <p className={styles.postDetailsTitle}>{report.title}</p>
              <p className={styles.postDetailsBody}>{report.content}</p>
            </div>
            <div className={styles.col}>
              <div className={styles.reportDetailsHeading}>
                <p className={styles.reportDetailsName}>
                  {report.reporter_name}
                </p>
                <IconPointFilled size={8} />
                <p className={styles.reportDetailsDate}>{report.report_date}</p>
              </div>
              <p className={styles.reportDetailsBody}>{report.reason}</p>
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

export default ReportsInterviewTips;
