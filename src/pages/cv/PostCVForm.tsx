import React from "react";
import styles from "./PostCVForm.module.scss";
import Button from "../../components/ui/Button";

interface PostCVFormProps {
  onClose?: () => void;
}

const PostCVForm: React.FC<PostCVFormProps> = () => {
  return (
    <div className={styles.formContainer}>
      <h2>Post Your CV</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows={4} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cvFile">Upload CV</label>
          <input type="file" id="cvFile" name="cvFile" />
        </div>
        <Button
          type="button"
          color={"primary"}
          roundness={"rounded"}
          classNames={styles.submitButton}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostCVForm; 