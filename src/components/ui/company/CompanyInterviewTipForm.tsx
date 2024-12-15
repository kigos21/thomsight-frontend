import { useEffect, useRef, useState } from "react";
import FormField from "../../form/FormField";
import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import styles from "./CompanyInterviewTipForm.module.scss";
import Quill from "quill";

interface Tip {
  title: string;
  description: string;
}

interface CompanyInterviewTipFormProps {
  tip: Tip;
  onSave: () => void;
  onChange: (review: Tip) => void;
  onCancel: () => void;
  isAddingTip: boolean;
}

const CompanyInterviewTipForm: React.FunctionComponent<
  CompanyInterviewTipFormProps
> = ({ tip, onSave, onChange, onCancel, isAddingTip }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "title") onChange({ ...tip, [name]: value });
  };
  const [desc, setDesc] = useState(tip.description);
  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (!quillRef.current || quillInstance.current) return;

    quillInstance.current = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }],
        ],
      },
    });

    quillInstance.current.root.innerHTML = tip.description;

    quillInstance.current.on("text-change", () => {
      const htmlContent = quillInstance.current?.root.innerHTML || "";
      setDesc(htmlContent);
    });
  }, [isAddingTip]);

  useEffect(() => {
    onChange({ ...tip, description: desc });
  }, [desc]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={`${styles.container}`}>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div>
            <p className={styles.formTitle}>Title</p>
            <FormField
              classNames={styles.formField}
              type="text"
              name="title"
              placeholder="Enter Tip Heading"
              // required={true}
              value={tip.title}
              onChange={handleInputChange}
            ></FormField>
          </div>

          <div>
            <p className={styles.formTitle}>Description</p>
            <div className={styles.quillWrapper}>
              <div ref={quillRef} className={styles.quillContainer}></div>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Button
              color="black"
              roundness="sm-rounded"
              classNames={styles.buttonCancel}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              roundness="sm-rounded"
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

export default CompanyInterviewTipForm;
