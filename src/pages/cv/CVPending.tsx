import styles from "./CVPending.module.scss";

import CVCard from "../../components/ui/cv/CVCard";

const CVPending = () => {
  return (
    <div className={styles.rootContainer}>
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="accept-request"
        onButtonClick={() => console.log("Accept request from a user")}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="accept-request"
        onButtonClick={() => console.log("Accept request from a user")}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="accept-request"
        onButtonClick={() => console.log("Accept request from a user")}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="accept-request"
        onButtonClick={() => console.log("Accept request from a user")}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="accept-request"
        onButtonClick={() => console.log("Accept request from a user")}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="accept-request"
        onButtonClick={() => console.log("Accept request from a user")}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="accept-request"
        onButtonClick={() => console.log("Accept request from a user")}
      />
    </div>
  );
};

export default CVPending;
