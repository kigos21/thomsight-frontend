import { CompanyLocationItemProps } from "../../../types/props";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import PaddedContainer from "../../layout/PaddedContainer";

import styles from "./CompanyLocationItem.module.scss";

export default function CompanyLocationItem({
  classNames,
  style,
  location,
}: CompanyLocationItemProps) {
  const handleIconClick = () => {
    console.log("Icon clicked!");
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={`${styles.container} ${classNames}`} style={style}>
        {/* ililipat tong title and button sa designated page */}
        <div className={styles.titleContainer}>
          <p>Company Location</p>
          <Button
            classNames={styles.locationButton}
            color="secondary"
            roundness="rounded"
          >
            Add Location
          </Button>
        </div>

        {/* eto retain eto yung companylocationitem */}
        <div className={styles.gridContainer}>
          <StyledBox paddedContainerClass={styles.styledBox}>
            <div className={styles.locationContainer}>
              <p>{location}</p>
              <div className={styles.iconContainer}>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconEdit
                    size={25}
                    stroke={1.5}
                    className={styles.iconEdit}
                  />
                </button>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconTrash
                    size={25}
                    stroke={1.5}
                    className={styles.iconDelete}
                  />
                </button>
              </div>
            </div>
          </StyledBox>
          <StyledBox paddedContainerClass={styles.styledBox}>
            <div className={styles.locationContainer}>
              <p>{location}</p>
              <div className={styles.iconContainer}>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconEdit
                    size={25}
                    stroke={1.5}
                    className={styles.iconEdit}
                  />
                </button>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconTrash
                    size={25}
                    stroke={1.5}
                    className={styles.iconDelete}
                  />
                </button>
              </div>
            </div>
          </StyledBox>{" "}
          <StyledBox paddedContainerClass={styles.styledBox}>
            <div className={styles.locationContainer}>
              <p>{location}</p>
              <div className={styles.iconContainer}>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconEdit
                    size={25}
                    stroke={1.5}
                    className={styles.iconEdit}
                  />
                </button>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconTrash
                    size={25}
                    stroke={1.5}
                    className={styles.iconDelete}
                  />
                </button>
              </div>
            </div>
          </StyledBox>{" "}
          <StyledBox paddedContainerClass={styles.styledBox}>
            <div className={styles.locationContainer}>
              <p>{location}</p>
              <div className={styles.iconContainer}>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconEdit
                    size={25}
                    stroke={1.5}
                    className={styles.iconEdit}
                  />
                </button>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconTrash
                    size={25}
                    stroke={1.5}
                    className={styles.iconDelete}
                  />
                </button>
              </div>
            </div>
          </StyledBox>
          <StyledBox paddedContainerClass={styles.styledBox}>
            <div className={styles.locationContainer}>
              <p>{location}</p>
              <div className={styles.iconContainer}>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconEdit
                    size={25}
                    stroke={1.5}
                    className={styles.iconEdit}
                  />
                </button>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconTrash
                    size={25}
                    stroke={1.5}
                    className={styles.iconDelete}
                  />
                </button>
              </div>
            </div>
          </StyledBox>
        </div>
      </div>
    </PaddedContainer>
  );
}
