import CVCard from "../../components/ui/CVCard";
import styles from "./CVListing.module.scss";

const CVListing = () => {
  return (
    <div className={styles.rootContainer}>
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonText={"Request Access"}
        buttonVariant="request-access"
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonText={"Delete"}
        buttonVariant="delete"
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonText={"Accept Request"}
        buttonVariant="accept-request"
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position Help me review my CV guys, I am applying for a Junior Developer Help me review my CV guys, I am applying for a Junior Developer Help me review my CV guys, I am applying for a Junior Developer Help me review my CV guys, I am applying for a Junior Developer "
        }
        buttonText={"Review"}
        buttonVariant="review"
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonText={"Submitted"}
        buttonVariant="submitted"
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonText={"Cancel Request"}
        buttonVariant="cancel"
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonText={"View Feedback"}
        buttonVariant="view-feedback"
      />
    </div>
  );
};

export default CVListing;
