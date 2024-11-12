import { IconCheck, IconPointFilled, IconX } from "@tabler/icons-react";
import ReportsTable from "../../components/ui/reports/ReportsTable";
import styles from "./ReportsDiscussion.module.scss";
import { DiscussionReport } from "../../types/types";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import DeletePopUp from "../../components/ui/company/DeletePopUp";
import SuccessMessage from "../../components/form/SuccessMessage";
import ValidationError from "../../components/form/ValidationError";

const ReportsDiscussion = () => {
  const [reports, setReports] = useState<DiscussionReport[]>([]);
  const [loading, setLoading] = useState<string>("Fetching reports...");
  const [showDeleteReportPopup, setShowDeleteReportPopup] =
    useState<boolean>(false);
  const [showDeleteRDPopup, setShowDeleteRDPopup] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get("/api/reports/discussion");
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading("");
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <Spinner message={loading} />;
  }

  const handleDeleteReport = async (id: number) => {
    try {
      setLoading("Dismissing report...");
      await axiosInstance.delete(`/api/report/discussion/${id}/delete`);
      setSuccess("Dismissed report");
      setReports(reports.filter((report) => report.id !== id));
    } catch (error) {
      setError("Error deleting report:" + error);
    } finally {
      setLoading("");
      setShowDeleteReportPopup(false);
    }
  };

  const handleDeleteDiscussionAndReport = async (
    id: number,
    discussionId: number
  ) => {
    try {
      setLoading("Deleting discussion...");
      await axiosInstance.delete(
        `/api/report/discussion/${id}/delete/with-discussion`
      );
      setSuccess("Deleted discussion successfully");
      setReports(
        reports.filter((report) => report.discussion_id !== discussionId)
      );
    } catch (error) {
      setError("Error deleting discussion and report:" + error);
      console.error(error);
    } finally {
      setLoading("");
      setShowDeleteRDPopup(false);
    }
  };

  return (
    <div>
      <h1 className={styles.heading}>Discussion</h1>
      {success && <SuccessMessage message={success} />}
      {error && <ValidationError message={error} />}
      <ReportsTable>
        {reports.map((report) => (
          <div key={report.id} className={styles.row}>
            <div className={styles.col}>
              <div className={styles.postDetailsHeading}>
                <p className={styles.postDetailsName}>{report.poster_name}</p>
                <IconPointFilled size={8} />
                <p className={styles.postDetailsDate}>{report.posted_date}</p>
              </div>
              <p className={styles.postDetailsBody}>{report.description}</p>
            </div>
            <div className={styles.col}>
              <div className={styles.reportDetailsHeading}>
                <p className={styles.reportDetailsName}>
                  {report.reporter_name}
                </p>
                <IconPointFilled size={8} />
                <p className={styles.reportDetailsDate}>{report.report_date}</p>
              </div>
              <p>{report.issue}</p>
              <p className={styles.reportDetailsBody}>{report.reason}</p>
            </div>
            <div className={styles.thirdCol}>
              <div className={styles.actionsButtonGroup}>
                <button
                  className={styles.btnCheck}
                  onClick={() => setShowDeleteRDPopup(true)}
                >
                  <IconCheck className={styles.iconCheck} />
                </button>
                <button
                  className={styles.btnDismiss}
                  onClick={() => setShowDeleteReportPopup(true)}
                >
                  <IconX className={styles.iconX} />
                </button>
              </div>
            </div>
            {showDeleteReportPopup && (
              <DeletePopUp
                isVisible={showDeleteReportPopup}
                onClose={() => setShowDeleteReportPopup(false)}
                onDelete={() => handleDeleteReport(report.id)}
                heading="Dismiss Report"
                details="Are you sure you want to dismiss this report?"
              />
            )}

            {showDeleteRDPopup && (
              <DeletePopUp
                isVisible={showDeleteRDPopup}
                onClose={() => setShowDeleteRDPopup(false)}
                onDelete={() =>
                  handleDeleteDiscussionAndReport(
                    report.id,
                    report.discussion_id
                  )
                }
                heading="Delete Discussion"
                details="Are you sure you want to delete this discussion? Please note that all replies in this discussion will be deleted as well."
              />
            )}
          </div>
        ))}
      </ReportsTable>
    </div>
  );
};

export default ReportsDiscussion;
