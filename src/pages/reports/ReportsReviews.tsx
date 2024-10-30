import styles from "./ReportsReviews.module.scss";
import ReportsTable from "../../components/ui/reports/ReportsTable";
import { IconCheck, IconPointFilled, IconX } from "@tabler/icons-react";
import axiosInstance from "../../services/axiosInstance";
import { useEffect, useState } from "react";
import Spinner from "../../components/ui/Spinner";
import { FeedbackReport } from "../../types/types";

const ReportsReviews = () => {
  const [reports, setReports] = useState<FeedbackReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get("/api/reports/feedback");
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
      <h1 className={styles.heading}>Reviews</h1>
      <ReportsTable>
        {reports.map((report) => (
          <div key={report.id} className={styles.row}>
            <div className={styles.col}>
              <div className={styles.postDetailsHeading}>
                <p className={styles.postDetailsName}>{report.poster_name}</p>
                <IconPointFilled size={8} />
                <p className={styles.postDetailsDate}>{report.posted_date}</p>
              </div>
              <p className={styles.postDetailsRating}>
                Rating: {report.rating}
              </p>
              <p className={styles.postDetailsBody}>{report.review}</p>
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

export default ReportsReviews;
