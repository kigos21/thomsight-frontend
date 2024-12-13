import { HomeCompanyItemProps } from "../../../types/props";
import styles from "./HomeCompanyItem.module.scss";
import JobChip from "./JobChip";
import { IconMapPin, IconStarFilled } from "@tabler/icons-react";

const HomeCompanyItem: React.FunctionComponent<HomeCompanyItemProps> = ({
  company,
}) => {
  const { name, jobs, locations, image } = company;
  const trimmedJobs = jobs?.slice(0, 2);

  const someBoolState = true;

  const getInitials = (companyName: string) => {
    const words = companyName.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials;
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardHeader}>
        {image !== "http://localhost:8000/storage/uploads/companies" ? (
          <img
            src={image}
            alt={"Image of " + name}
            className={styles.companyImage}
          />
        ) : (
          <div className={styles.companyImageFallback}>
            {name ? getInitials(name) : "NA"}
          </div>
        )}

        {/* Company Name and Location (Clamped to 1 line) */}
        <div className={styles.nameAndLocation}>
          {/* Company Name */}
          <p className={styles.companyName}>{name || "No company name set"}</p>

          {/* First Location */}
          <p className={styles.companyLocation}>
            <IconMapPin className={styles.locationIcon} />
            {locations && locations.length > 0 ? (
              <p className={styles.location}>
                {locations.map((location) => location.address).join(" | ")}{" "}
              </p>
            ) : (
              <p className={styles.location}>No locations available</p>
            )}
          </p>
        </div>
      </div>

      <div className={styles.cardBody}>
        {/* Render if there are reviews, else fallback */}
        {someBoolState ? (
          <p className={styles.reviews}>
            <IconStarFilled className={styles.starIcon} />
            5.0 | 4 reviews
          </p>
        ) : (
          <p className={styles.reviews}>
            <IconStarFilled className={styles.starIcon} />
            No reviews available
          </p>
        )}

        {trimmedJobs && (
          <div className={styles.jobsSection}>
            {trimmedJobs.map((job, index) => (
              <JobChip key={index} job={job} /> // Ensure job is a string
            ))}
            {jobs && jobs.length > 2 && (
              <JobChip
                job={{
                  id: -1,
                  title: "...",
                  description: "...",
                  company_id: -1,
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCompanyItem;
