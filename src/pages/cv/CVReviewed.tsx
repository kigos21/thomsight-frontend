import styles from "./CVReviewed.module.scss";

import CVCard from "../../components/ui/cv/CVCard";

const CVReviewed = () => {
  return (
    <div className={styles.rootContainer}>
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="submitted"
        // ------------------ URL FORMAT -----------------
        // /cv-review/view/:id
        url={"/cv-review/view/1"}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="submitted"
        url={"/cv-review/view/1"}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="submitted"
        url={"/cv-review/view/1"}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="submitted"
        url={"/cv-review/view/1"}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="submitted"
        url={"/cv-review/view/1"}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="submitted"
        url={"/cv-review/view/1"}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="submitted"
        url={"/cv-review/view/1"}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="submitted"
        url={"/cv-review/view/1"}
      />
    </div>
  );
};

export default CVReviewed;
