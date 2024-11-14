import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import StyledBox from "../../components/layout/StyledBox";
import FormField from "../../components/form/FormField";
import {
  IconPhone,
  IconUser,
  IconBook2,
  IconEdit,
  IconX,
  IconCheck,
} from "@tabler/icons-react";

import styles from "./ProfileManagement.module.scss";
import { useUser } from "../../contexts/UserContext";
import { FormEvent, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { containsBadWords } from "../../badWordsFilter";

export default function ProfileManagement() {
  const { user, updateUser } = useUser();
  const [name, setName] = useState<string | undefined>(user?.name || "");
  const [phone, setPhone] = useState<string>(user?.phone_number || "");
  const [bio, setBio] = useState<string>(user?.bio || "");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempProfileName, setTempProfileName] = useState<string>(user!.name);
  const [isSaving, setIsSaving] = useState(false);

  const handleConfirmClick = () => {
    setIsEditingName(false);
    setName(tempProfileName);
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (bio.length > 255) {
      toast.error("Bio must not exceed 255 characters.");
      setIsSaving(false);
      return;
    }
    if (containsBadWords(tempProfileName)) {
      toast.error("Name contains foul language");
      setIsSaving(false);
      return;
    }
    if (containsBadWords(bio)) {
      toast.error("Bio contains foul language");
      setIsSaving(false);
      return;
    }
    if (phone && !/^\d{11}$/.test(phone)) {
      toast.error("Phone number must be exactly 11 digits or left blank.");
      setIsSaving(false);
      return;
    }

    try {
      await axiosInstance.put("/api/update/profile", {
        name: tempProfileName,
        bio,
        phone_number: phone,
      });
      updateUser({ name: tempProfileName, bio, phone_number: phone });
      setName(tempProfileName);
      setIsEditingName(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Could not update profile, please try again.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };
  const navigate = useNavigate();

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <StyledBox classNames={styles.styledBox}>
        <div className={styles.container}>
          <h2 className={styles.title}>User Profile</h2>
          <IconUser size={100} stroke={2} className={styles.headerIcon} />
          <div className={styles.nameContainer}>
            {isEditingName ? (
              <div
                style={{
                  display: "flex",
                  gap: "0.25rem",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <FormField
                  type={"text"}
                  value={tempProfileName}
                  onChange={(e) => {
                    setTempProfileName(e.target.value);
                  }}
                  placeholder={"Profile name"}
                  classNames={styles.profileFormField}
                  parentDivClassnames={styles.formFieldParentDiv}
                  required={true}
                />
                <Button
                  color={"black"}
                  roundness={"sm-rounded"}
                  classNames={styles.cancelEditButton}
                  onClick={() => setIsEditingName(false)}
                >
                  <IconX />
                </Button>
                <Button
                  color={"primary"}
                  roundness={"sm-rounded"}
                  classNames={styles.sendEditButton}
                  onClick={handleConfirmClick}
                >
                  <IconCheck />
                </Button>
              </div>
            ) : (
              <div
                style={{ display: "flex", width: "100%", alignItems: "center" }}
              >
                <p className={styles.name}>{name}</p>
                <IconEdit
                  size={30}
                  stroke={1.5}
                  className={styles.editIcon}
                  onClick={() => {
                    setIsEditingName(true);
                  }}
                />
              </div>
            )}
          </div>
          <form className={styles.form} onSubmit={handleSaveProfile}>
            <FormField
              classNames={styles.fieldBio}
              icon={
                <IconBook2
                  size={35}
                  stroke={1.5}
                  className={styles.iconTextArea}
                />
              }
              type="textarea"
              placeholder="Your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <FormField
              classNames={styles.fieldPhone}
              icon={
                <IconPhone size={35} stroke={1.5} className={styles.icon} />
              }
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
              onClick={() => navigate("/profile/change-password/")}
            >
              Change Password
            </Button>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </form>
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
