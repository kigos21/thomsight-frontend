import Button from "../../components/ui/Button";
import styles from "./CVFeedbackCreate.module.scss";

const CVFeedbackCreate = () => {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.documentPlaceholder}>PDF Document</div>
      <h2 className={styles.remarksHeading}>Remarks</h2>

      <textarea
        name="comments"
        id="comments"
        rows={12}
        className={styles.textarea}
        placeholder="Comments"
      ></textarea>

      <Button color={"secondary"} roundness={"rounded"}>
        Submit
      </Button>
    </div>
  );
};

export default CVFeedbackCreate;
