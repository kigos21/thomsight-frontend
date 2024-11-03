import styles from "./ReportsInterviewTips.module.scss";

import ReportsTable from "../../components/ui/reports/ReportsTable";
import { IconCheck, IconPointFilled, IconX } from "@tabler/icons-react";
import axiosInstance from "../../services/axiosInstance";
import { TipReport } from "../../types/types";
import { useEffect, useState } from "react";
import Spinner from "../../components/ui/Spinner";
import SuccessMessage from "../../components/form/SuccessMessage";
import ValidationError from "../../components/form/ValidationError";
import DeletePopUp from "../../components/ui/company/DeletePopUp";

const ReportsInterviewTips = () => {
  const [reports, setReports] = useState<TipReport[]>([]);
  const [loading, setLoading] = useState<string>("Fetching reports...");
  const [showDeleteReportPopup, setShowDeleteReportPopup] =
    useState<boolean>(false);
  const [showDeleteRTPopup, setShowDeleteRTPopup] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get("/api/reports/tips");
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
      await axiosInstance.delete(`/api/report/tip/${id}/delete`);
      setSuccess("Dismissed report");
      setReports(reports.filter((report) => report.id !== id));
    } catch (error) {
      setError("Error deleting report:" + error);
    } finally {
      setLoading("");
      setShowDeleteReportPopup(false);
    }
  };

  const handleDeleteTipAndReport = async (id: number, tipId: number) => {
    try {
      setLoading("Deleting interview tip...");
      await axiosInstance.delete(`/api/report/tip/${id}/delete/with-tip`);
      setSuccess("Deleted review successfully");
      setReports(reports.filter((report) => report.tip_id !== tipId));
    } catch (error) {
      setError("Error deleting review and report:" + error);
      console.error(error);
    } finally {
      setLoading("");
      setShowDeleteRTPopup(false);
    }
  };

  return (
    <div>
      <h1 className={styles.heading}>Interview Tips</h1>
      {success && <SuccessMessage message={success} />}
      {error && <ValidationError message={error} />}
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
                  <IconCheck
                    className={styles.iconCheck}
                    onClick={() => setShowDeleteRTPopup(true)}
                  />
                </button>
                <button className={styles.btnDismiss}>
                  <IconX
                    className={styles.iconX}
                    onClick={() => setShowDeleteReportPopup(true)}
                  />
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

            {showDeleteRTPopup && (
              <DeletePopUp
                isVisible={showDeleteRTPopup}
                onClose={() => setShowDeleteRTPopup(false)}
                onDelete={() =>
                  handleDeleteTipAndReport(report.id, report.tip_id)
                }
                heading="Delete Interview Tip"
                details="Are you sure you want to delete this interview tip?"
              />
            )}
          </div>
        ))}
      </ReportsTable>
    </div>
  );
};

export default ReportsInterviewTips;
