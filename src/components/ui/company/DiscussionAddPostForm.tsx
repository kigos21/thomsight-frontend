import FormField from "../../form/FormField";
import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import styles from "./CompanyReviewForm.module.scss";

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
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...post, [name]: value }); // Update review state based on input change
  };

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
            <FormField
              classNames={styles.formFieldBio}
              type="textarea"
              name="description"
              placeholder="Tell us about your post"
              value={post.description}
              onChange={handleInputChange}
            ></FormField>
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
