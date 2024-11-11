import React, { useEffect, useState } from "react";
import { CompanyAccountsItemProps } from "../../../types/props";
import styles from "./CompanyAccountsItem.module.scss";
import { IconRestore, IconTrash } from "@tabler/icons-react";
import Status from "./Status";

const CompanyAccountsItem: React.FC<CompanyAccountsItemProps> = ({
  companyName,
  expiration,
  status,
  email,
  handleSoftDelete,
  handleRestore,
  companyId,
  isTrashed,
}) => {
  const [isDeleted, setIsDeleted] = useState(isTrashed);
  useEffect(() => {
    setIsDeleted(isTrashed);
  }, [isTrashed]);

  const softDelete = async () => {
    const success = await handleSoftDelete(companyId);
    if (success) setIsDeleted(true);
  };

  const restore = async () => {
    const success = await handleRestore(companyId);
    if (success) setIsDeleted(false);
  };

  return (
    <div className={styles.tokenItem}>
      <p className={styles.token}>{companyName}</p>
      <Status status={status} />
      <p className={styles.expiration}>{expiration}</p>
      <p>{email}</p>
      {isDeleted ? (
        <IconRestore className={styles.restoreIcon} onClick={restore} />
      ) : (
        <IconTrash className={styles.trashIcon} onClick={softDelete} />
      )}
    </div>
  );
};

export default CompanyAccountsItem;
