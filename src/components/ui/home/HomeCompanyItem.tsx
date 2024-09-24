import StyledBox from "../../layout/StyledBox";
import { HomeCompanyItemProps } from "../../../types/props";
import styles from "./HomeCompanyItem.module.scss";
import JobChip from "./JobChip";

const HomeCompanyItem: React.FunctionComponent<HomeCompanyItemProps> = ({
  imgSrc,
  about,
  name,
  jobs,
  location,
}) => {
  // Trimmin the jobs array will
  const trimmedJobs = jobs?.slice(0, 3);

  return (
    <StyledBox
      classNames={styles.container}
      paddedContainerClass={styles.paddedContainer}
    >
      <img
        src={imgSrc}
        alt={"Image of " + name}
        className={styles.companyImage}
      />

      <div className={styles.coreInfoSection}>
        <p className={styles.companyName}>{name}</p>
        <p className={styles.location}>{location}</p>
        {jobs && (
          <div className={styles.jobsSection}>
            {trimmedJobs?.map((job) => <JobChip job={job} />)}
          </div>
        )}
      </div>

      <div className={styles.about}>{about}</div>
    </StyledBox>
  );
};

export default HomeCompanyItem;
