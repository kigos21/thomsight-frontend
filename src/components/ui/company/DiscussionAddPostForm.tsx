import { useEffect, useState } from "react";
import FormField from "../../form/FormField";
import SuccessMessage from "../../form/SuccessMessage";
import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import Spinner from "../Spinner";
import styles from "./CompanyReviewForm.module.scss";

interface Post {
  description: string;
}

interface DiscussionAddPostFormProps {
  post: Post;
  onSave: () => void;
  onChange: (post: Post) => void;
  onCancel: () => void;
}

const DiscussionAddPostForm: React.FunctionComponent<
  DiscussionAddPostFormProps
> = ({ post, onSave, onChange, onCancel }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...post, [name]: value }); // Update review state based on input change
  };

  // const { slug } = useParams<{ slug: string }>();
  // const [reviewRating, setReviewRating] = useState("");
  // const [reviewDescription, setReviewDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  // const { getCompanyBySlug, updateCompany, createJob } = useCompanies();
  // const company = getCompanyBySlug(slug || "");
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  // PAKIBURA NETO, NEED KO LANG ICONSOLE LOG FOR NOW, MAARTE LINTER
  useEffect(() => {
    console.log(error);
    console.log(setError(""));
    console.log(setSuccess(false));
    console.log(setCreating(false));
  }, []);
  // END OF PAKIBURA

  return (
    <div className={`${styles.container}`}>
      {creating && <Spinner message="Creating job..." />}
      {success && <SuccessMessage message="Created job successfully" />}
      <StyledBox paddedContainerClass={styles.styledBox}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div>
            <p className={styles.formTitle}>Description</p>
            <FormField
              classNames={styles.formFieldBio}
              type="textarea"
              name="description"
              placeholder="Tell us about your post"
              required={true}
              value={post.description}
              onChange={handleInputChange}
            ></FormField>
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
