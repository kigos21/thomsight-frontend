import StyledBox from "../../layout/StyledBox";
import { HomeCompanyItemProps } from "../../../types/props";
import styles from "./HomeCompanyItem.module.scss";
import JobChip from "./JobChip";

const HomeCompanyItem: React.FunctionComponent<HomeCompanyItemProps> = ({
  company,
}) => {
  const { name, jobs, description, locations, image } = company;
  const trimmedJobs = jobs?.slice(0, 3);

  return (
    <StyledBox
      classNames={styles.container}
      paddedContainerClass={styles.paddedContainer}
    >
      <img
        src={image}
        alt={"Image of " + name}
        className={styles.companyImage}
      />

      <div className={styles.coreInfoSection}>
        <p className={styles.companyName}>{name}</p>
        <div className={styles.locationSection}>
          {locations && locations.length > 0 ? (
            <p className={styles.location}>
              {locations.map((location) => location.address).join(" | ")}{" "}
            </p>
          ) : (
            <p className={styles.location}>No locations available</p>
          )}
        </div>

        {trimmedJobs && (
          <div className={styles.jobsSection}>
            {trimmedJobs.map((job, index) => (
              <JobChip key={index} job={job} /> // Ensure job is a string
            ))}
          </div>
        )}
      </div>

      <div className={styles.about}>{description}</div>
    </StyledBox>
  );
};

export default HomeCompanyItem;
