import React, { useState } from "react";
import { CompanyAccountsItemProps } from "../../../types/props";
import styles from "./CompanyAccountsItem.module.scss";
import { IconRestore, IconTrash } from "@tabler/icons-react";
import Status from "./Status";

const CompanyAccountsItem: React.FC<CompanyAccountsItemProps> = ({
  companyName,
  expiration,
  status,
  email,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  return (
    <div className={styles.tokenItem}>
      <p className={styles.token}>{companyName}</p>
      <Status status={status} />
      <p className={styles.expiration}>{expiration}</p>
      <p>{email}</p>
      {isDeleted ? (
        <IconRestore
          className={styles.restoreIcon}
          onClick={() => setIsDeleted(false)}
        />
      ) : (
        <IconTrash
          className={styles.trashIcon}
          onClick={() => setIsDeleted(true)}
        />
      )}
    </div>
  );
};

export default CompanyAccountsItem;
