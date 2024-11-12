import React, { useState } from "react";
import { TokenItemProps } from "../../../types/props";
import styles from "./TokenItem.module.scss";
import { IconEdit, IconTrash, IconMail } from "@tabler/icons-react";
import TokenFormField from "./TokenFormField";
import DeletePopUp from "../company/DeletePopUp";
import Spinner from "../Spinner";
import axiosInstance from "../../../services/axiosInstance";
import Status from "./Status";
import { toast } from "react-toastify";

const TokenItem: React.FC<TokenItemProps> = ({
  id,
  number,
  token,
  email,
  onDeleteToken,
  handleEmailSuccess,
  updateEmail,
  expiring,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<string>("");

  const handleDeleteClick = () => {
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

  const handleMailClick = async () => {
    if (!email) {
      toast.error("No email provided.");
      return;
    }

    try {
      setLoading("Sending email...");
      await axiosInstance.post("/api/tokens/email", {
        email,
        token,
      });
      handleEmailSuccess();
    } catch (error) {
      toast.error("Failed to send email");
      console.error(error);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className={styles.tokenItem}>
      {deleteLoading && <Spinner message="Deleting token..." />}
      {loading && <Spinner message={loading} />}
      <span className={styles.number}>{number}</span>
      <span className={styles.token}>{token}</span>
      <span className={styles.status}>
        {expiring ? <Status status="expiring" /> : <Status status="active" />}
      </span>
      <TokenFormField
        classNames={styles.tokenformfield}
        type="text"
        placeholder="Company"
        required={true}
        readOnly={true} // Initially read-only
        editIcon={<IconEdit />} // Icon to make it editable
        initialEmail={email}
        tokenId={id}
        updateEmail={updateEmail}
      />
      <div className={styles.iconHolder}>
        <IconMail className={styles.mailIcon} onClick={handleMailClick} />
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
