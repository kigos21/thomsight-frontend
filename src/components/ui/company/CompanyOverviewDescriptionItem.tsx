import { CompanyOverviewDescriptionItemProps } from "../../../types/props";
import { IconEdit } from "@tabler/icons-react";
import StyledBox from "../../layout/StyledBox";
import PaddedContainer from "../../layout/PaddedContainer";
import FormField from "../../form/FormField";

import styles from "./CompanyOverviewDescriptionItem.module.scss";

export default function CompanyOverviewDescriptionItem({
  classNames,
  style,
  companyDescription,
}: CompanyOverviewDescriptionItemProps) {
  const handleIconClick = () => {
    console.log("Icon clicked!");
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
        <div className={styles.companyDescriptionContainer}>
          <div className={styles.descriptionHeader}>
            <p>Company Description</p>
            <button onClick={handleIconClick} className={styles.iconButton}>
              <IconEdit size={25} stroke={1.5} className={styles.iconEdit} />
            </button>
          </div>
          <p className={styles.description}>{companyDescription}</p>
        </div>

        <StyledBox paddedContainerClass={styles.styledBox}>
          <div className={styles.formContainer}>
            <div>
              <div className={styles.formTitle}>
                <p>Company Size</p>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconEdit
                    size={25}
                    stroke={1.5}
                    className={styles.iconEdit}
                  />
                </button>
              </div>
              <FormField
                classNames={styles.formField}
                type="text"
                placeholder="Input Company Size"
                required
              ></FormField>
            </div>

            <div>
              <div className={styles.formTitle}>
                <p>Company Industry</p>
                <button onClick={handleIconClick} className={styles.iconButton}>
                  <IconEdit
                    size={25}
                    stroke={1.5}
                    className={styles.iconEdit}
                  />
                </button>
              </div>
              <FormField
                classNames={styles.formField}
                type="text"
                placeholder="Input Company Industry"
                required
              ></FormField>
            </div>
          </div>
        </StyledBox>
      </div>
    </PaddedContainer>
  );
}
