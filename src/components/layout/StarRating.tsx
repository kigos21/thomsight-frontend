import React from "react";
import { IconStarFilled } from "@tabler/icons-react";
import styles from "./StarRating.module.scss";

interface StarRatingProps {
  rating: string;
  onRate: (rating: string) => void;
}

const StarRating: React.FunctionComponent<StarRatingProps> = ({
  rating,
  onRate,
}) => {
  const handleClick = (index: number) => {
    onRate((index + 1).toString());
  };

  return (
    <div className={styles.starContainer}>
      {[...Array(5)].map((_, index) => (
        <IconStarFilled
          size={30}
          key={index}
          className={
            index < Number(rating) ? styles.filledStar : styles.emptyStar
          }
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default StarRating;
