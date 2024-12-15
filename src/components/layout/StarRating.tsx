import React from "react";
import { IconStarFilled } from "@tabler/icons-react";
import styles from "./StarRating.module.scss";

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
}

const StarRating: React.FunctionComponent<StarRatingProps> = ({
  rating,
  onRate,
}) => {
  const handleClick = (index: number) => {
    onRate(index + 1);
  };

  return (
    <div className={styles.starContainer}>
      {[...Array(5)].map((_, index) => (
        <IconStarFilled
          size={30}
          key={index}
          className={index < rating ? styles.filledStar : styles.emptyStar}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
