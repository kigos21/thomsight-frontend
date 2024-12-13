import styles from "./ReportsInterviewTips.module.scss";

import ReportsTable from "../../components/ui/reports/ReportsTable";
import { IconCheck, IconPointFilled, IconX } from "@tabler/icons-react";
import axiosInstance from "../../services/axiosInstance";
import { TipReport } from "../../types/types";
import { useEffect, useState } from "react";
import Spinner from "../../components/ui/Spinner";
import DeletePopUp from "../../components/ui/company/DeletePopUp";
import DismissPopUp from "../../components/ui/reports/DismissPopUp";
import { toast } from "react-toastify";

const ReportsInterviewTips = () => {
  const [reports, setReports] = useState<TipReport[]>([]);
  const [loading, setLoading] = useState<string>("Fetching reports...");
  const [showDeleteReportPopup, setShowDeleteReportPopup] =
    useState<boolean>(false);
  const [showDeleteRTPopup, setShowDeleteRTPopup] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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

  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const paginatedReports = reports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteReport = async (id: number) => {
    try {
      setLoading("Dismissing report...");
      await axiosInstance.delete(`/api/report/tip/${id}/delete`);
      toast.success("Dismissed report");
      setReports(reports.filter((report) => report.id !== id));
      setCurrentPage(1);
    } catch (error) {
      toast.error("Error deleting report:" + error);
    } finally {
      setLoading("");
      setShowDeleteReportPopup(false);
    }
  };

  const handleDeleteTipAndReport = async (id: number, tipId: number) => {
    try {
      setLoading("Deleting interview tip...");
      await axiosInstance.delete(`/api/report/tip/${id}/delete/with-tip`);
      toast.success("Deleted review successfully");
      setReports(reports.filter((report) => report.tip_id !== tipId));
      setCurrentPage(1);
    } catch (error) {
      toast.error("Error deleting review and report:" + error);
      console.error(error);
    } finally {
      setLoading("");
      setShowDeleteRTPopup(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className={styles.heading}>Interview Tips</h1>
      <ReportsTable>
        {paginatedReports.map((report) => (
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
              <div className={styles.reportIssueHolder}>
                <p>Report Issue:</p>
                <p>{report.issue}</p>
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
              <DismissPopUp
                isVisible={showDeleteReportPopup}
                onClose={() => setShowDeleteReportPopup(false)}
                onDismiss={() => handleDeleteReport(report.id)}
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

        {reports.length > itemsPerPage && (
          <div className={styles.pagination}>
            <button
              className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              &#60; Previous
            </button>
            <button
              className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(
                Math.max(currentPage - 2, 0),
                Math.min(currentPage + 1, totalPages)
              )
              .map((page) => (
                <button
                  key={page}
                  className={`${styles.paginationButton} ${currentPage === page ? styles.active : ""}`}
                  onClick={() => handlePageSelect(page)}
                >
                  {page}
                </button>
              ))}

            <button
              className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
            <button
              className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next &#62;
            </button>
          </div>
        )}
      </ReportsTable>
    </div>
  );
};

export default ReportsInterviewTips;
