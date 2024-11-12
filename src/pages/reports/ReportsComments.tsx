import { IconCheck, IconPointFilled, IconX } from "@tabler/icons-react";
import ReportsTable from "../../components/ui/reports/ReportsTable";
import styles from "./ReportsComments.module.scss";
import { CommentReport } from "../../types/types";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import DeletePopUp from "../../components/ui/company/DeletePopUp";
import { toast } from "react-toastify";

const ReportsComments = () => {
  const [reports, setReports] = useState<CommentReport[]>([]);
  const [loading, setLoading] = useState<string>("Fetching reports...");
  const [showDeleteReportPopup, setShowDeleteReportPopup] =
    useState<boolean>(false);
  const [showDeleteRDPopup, setShowDeleteRDPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get("/api/reports/comments");
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
      await axiosInstance.delete(`/api/report/comment/${id}/delete`);
      toast.success("Dismissed report");
      setReports(reports.filter((report) => report.id !== id));
    } catch (error) {
      toast.error("Error deleting report:" + error);
    } finally {
      setLoading("");
      setShowDeleteReportPopup(false);
    }
  };

  const handleDeleteCommentAndReport = async (
    id: number,
    commentId: number
  ) => {
    try {
      setLoading("Deleting comment...");
      await axiosInstance.delete(
        `/api/report/comment/${id}/delete/with-comment`
      );
      toast.success("Deleted comment successfully");
      setReports(reports.filter((report) => report.comment_id !== commentId));
    } catch (error) {
      toast.error("Error deleting comment and report");
      console.error(error);
    } finally {
      setLoading("");
      setShowDeleteRDPopup(false);
    }
  };

  return (
    <div>
      <h1 className={styles.heading}>Comment</h1>
      <ReportsTable>
        {reports.map((report) => (
          <div key={report.id} className={styles.row}>
            <div className={styles.col}>
              <div className={styles.postDetailsHeading}>
                <p className={styles.postDetailsName}>{report.poster_name}</p>
                <IconPointFilled size={8} />
                <p className={styles.postDetailsDate}>{report.posted_date}</p>
              </div>
              <p className={styles.postDetailsBody}>{report.comment}</p>
            </div>
            <div className={styles.col}>
              <div className={styles.reportDetailsHeading}>
                <p className={styles.reportDetailsName}>
                  {report.reporter_name}
                </p>
                <IconPointFilled size={8} />
                <p className={styles.reportDetailsDate}>{report.report_date}</p>
              </div>
              <div className={styles.reportIssueHolder}>
                <p>Report Issue:</p>
                <p>{report.issue}</p>
              </div>
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
                  handleDeleteCommentAndReport(report.id, report.comment_id)
                }
                heading="Delete Comment"
                details="Are you sure you want to delete this comment?"
              />
            )}
          </div>
        ))}
      </ReportsTable>
    </div>
  );
};

export default ReportsComments;
