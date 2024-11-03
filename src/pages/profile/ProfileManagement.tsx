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
import SuccessMessage from "../../components/form/SuccessMessage";
import ValidationError from "../../components/form/ValidationError";
import { useNavigate } from "react-router-dom";

export default function ProfileManagement() {
  const { user, updateUser } = useUser();
  const [name, setName] = useState<string | undefined>(user?.name || "");
  const [phone, setPhone] = useState<string | null>(user?.phone_number || null);
  const [bio, setBio] = useState<string>(user?.bio || "");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempProfileName, setTempProfileName] = useState<string>(user!.name);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [bioError, setBioError] = useState<string>("");

  const handleConfirmClick = () => {
    setIsEditingName(false);
    setName(tempProfileName);
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setPhoneError("");
    setBioError("");
    setIsSaving(true);

    if (!/^\d{11}$/.test(phone || "")) {
      setPhoneError("Phone number must be 11 digits and contain only numbers.");
      setIsSaving(false);
      return;
    }

    if (bio.length > 255) {
      setBioError("Bio must not exceed 255 characters.");
      setIsSaving(false);
      return;
    }

    try {
      await axiosInstance.put("/api/update/profile", {
        name: tempProfileName,
        phone_number: phone,
        bio,
      });
      updateUser({ name, phone_number: phone || "", bio });
      setName(tempProfileName);
      setIsEditingName(false);
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError("Could not update profile, please try again." + error);
    } finally {
      setIsSaving(false);
    }
  };
  const navigate = useNavigate();

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <StyledBox classNames={styles.styledBox}>
        <div className={styles.container}>
          {success && <SuccessMessage message={success} />}
          {error && <ValidationError message={error} />}
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
                  onChange={(e) => setTempProfileName(e.target.value)}
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
                    setSuccess("");
                  }}
                />
              </div>
            )}
          </div>
          <form className={styles.form} onSubmit={handleSaveProfile}>
            {bioError && <ValidationError message={bioError} />}
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
            {/* <FormField
              icon={<IconUser size={35} stroke={1.5} className={styles.icon} />}
              type="text"
              placeholder="Profile Link"
              required={true}
            /> */}
            {phoneError && <ValidationError message={phoneError} />}
            <FormField
              icon={
                <IconPhone size={35} stroke={1.5} className={styles.icon} />
              }
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {/* <FormField
              icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
              type="password"
              placeholder="Your Password"
              required={true}
            />
            <FormField
              icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
              type="password"
              placeholder="Your New Password"
              required={true}
            /> */}

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
