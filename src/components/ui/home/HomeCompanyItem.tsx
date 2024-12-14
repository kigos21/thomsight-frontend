import { HomeCompanyItemProps } from "../../../types/props";
import styles from "./HomeCompanyItem.module.scss";
import JobChip from "./JobChip";
import { IconMapPin, IconStarFilled } from "@tabler/icons-react";
import srcLogo from "../../../assets/no-image.png";

const HomeCompanyItem: React.FunctionComponent<HomeCompanyItemProps> = ({
  company,
}) => {
  const { name, jobs, locations, image, rating, reviews } = company;
  const trimmedJobs = jobs?.slice(0, 2);
  const numericRating = Number(rating);
  let formattedRating = "0.0";

  if (numericRating && numericRating !== 0)
    formattedRating =
      numericRating % 1 === 0 || numericRating % 0.5 === 0
        ? numericRating.toFixed(1)
        : numericRating.toFixed(2);

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
          <img
            src={srcLogo}
            alt={"Image of " + name}
            className={styles.companyImage}
          />
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
        {formattedRating !== 0 && reviews !== 0 ? (
          <p className={styles.reviews}>
            <IconStarFilled className={styles.starIcon} />
            {formattedRating} | {reviews} {reviews === 1 ? "review" : "reviews"}
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
