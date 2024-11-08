import CVCard from "../../components/ui/cv/CVCard";
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
        buttonVariant="request-access"
        onButtonClick={() => console.log("Request access to user")}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="delete"
        onButtonClick={() => console.log("Delete user CV post")}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="request-access"
        onButtonClick={() => console.log("Request access to user")}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="request-access"
        onButtonClick={() => console.log("Request access to user")}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="request-access"
        onButtonClick={() => console.log("Request access to user")}
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="request-access"
        onButtonClick={() => console.log("Request access to user")}
      />
    </div>
  );
};

export default CVListing;
