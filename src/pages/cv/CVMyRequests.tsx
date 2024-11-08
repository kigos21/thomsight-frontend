import styles from "./CVMyRequests.module.scss";

import CVCard from "../../components/ui/cv/CVCard";

const CVMyRequests = () => {
  return (
    <div className={styles.rootContainer}>
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="cancel"
        onButtonClick={() => console.log("Cancel my request")}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="view-feedback"
        url={"/cv-review/view/1"}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="cancel"
        onButtonClick={() => console.log("Cancel my request")}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="view-feedback"
        url={"/cv-review/view/1"}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="cancel"
        onButtonClick={() => console.log("Cancel my request")}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="view-feedback"
        url={"/cv-review/view/1"}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="cancel"
        onButtonClick={() => console.log("Cancel my request")}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="view-feedback"
        url={"/cv-review/view/1"}
      />
    </div>
  );
};

export default CVMyRequests;
