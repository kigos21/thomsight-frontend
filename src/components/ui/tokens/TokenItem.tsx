import React, { useState } from "react";
import { TokenItemProps } from "../../../types/props";
import styles from "./TokenItem.module.scss";
import { IconEdit, IconTrash, IconMail } from "@tabler/icons-react";
import TokenFormField from "./TokenFormField";
import DeletePopUp from "../company/DeletePopUp";
import Spinner from "../Spinner";
import axiosInstance from "../../../services/axiosInstance";

const TokenItem: React.FC<TokenItemProps> = ({
  id,
  number,
  token,
  email,
  onDeleteToken,
  resetDeleteSuccess,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const handleDeleteClick = () => {
    resetDeleteSuccess();
    setDeleteConfirm(true);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axiosInstance.delete(`api/tokens/${id}/delete`);
      onDeleteToken(id);
    } catch (error) {
      console.error("Failed to delete token", error);
    } finally {
      setDeleteLoading(false);
      setDeleteConfirm(false);
    }
  };

  return (
    <div className={styles.tokenItem}>
      {deleteLoading && <Spinner message="Deleting token..." />}
      <span className={styles.number}>{number}</span>
      <span className={styles.token}>{token}</span>
      <TokenFormField
        classNames={styles.tokenformfield}
        type="text"
        placeholder="Company"
        required={true}
        readOnly={true} // Initially read-only
        editIcon={<IconEdit />} // Icon to make it editable
        initialEmail={email}
        tokenId={id}
      />
      <div className={styles.iconHolder}>
        <IconMail className={styles.mailIcon} />
        <IconTrash className={styles.trashIcon} onClick={handleDeleteClick} />
      </div>
      {deleteConfirm && (
        <DeletePopUp
          isVisible={deleteConfirm}
          onClose={() => setDeleteConfirm(false)}
          onDelete={handleDelete}
          heading="Delete Token"
          details="Are you sure you want to delete this token?"
        />
      )}
    </div>
  );
};

export default TokenItem;
