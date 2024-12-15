import { useEffect, useRef, useState } from "react";
import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import styles from "./CompanyReviewForm.module.scss";
import Quill from "quill";

interface Post {
  description: string;
}

interface DiscussionAddPostFormProps {
  post: Post;
  onSave: () => void;
  onChange: (post: Post) => void;
  onCancel: () => void;
  setSelectedFile: (file: File | null) => void;
}

const DiscussionAddPostForm: React.FunctionComponent<
  DiscussionAddPostFormProps
> = ({ post, onSave, onChange, onCancel, setSelectedFile }) => {
  const [description, setDescription] = useState(post.description);

  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (!quillRef.current || quillInstance.current) return;

    quillInstance.current = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        ],
      },
    });

    quillInstance.current.root.innerHTML = description;

    quillInstance.current.on("text-change", () => {
      const htmlContent = quillInstance.current?.root.innerHTML || "";
      setDescription(htmlContent);
      onChange({ description: htmlContent });
    });
  }, [description, onChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className={`${styles.container}`}>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div>
            <p className={styles.formTitle}>Description</p>
            <div className={styles.quillWrapper}>
              <div ref={quillRef} className={styles.quillContainer}></div>
            </div>
          </div>

          <div>
            <p className={styles.formTitle}>
              Image Upload (optional, max 4 MB)
            </p>
            <input
              id="fileInput"
              type="file"
              accept=".jpeg, .jpg, .png"
              onChange={handleFileChange}
            />
          </div>

          <div className={styles.buttonGroup}>
            <Button
              color="gray"
              roundness="rounded"
              classNames={styles.buttonCancel}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.buttonSubmit}
              onClick={onSave}
            >
              Submit
            </Button>
          </div>
        </form>
      </StyledBox>
    </div>
  );
};

export default DiscussionAddPostForm;
