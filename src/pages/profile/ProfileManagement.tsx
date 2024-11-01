import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import StyledBox from "../../components/layout/StyledBox";
import FormField from "../../components/form/FormField";
import {
  IconLock,
  IconPhone,
  IconUser,
  IconBook2,
  IconEdit,
  IconX,
  IconCheck,
} from "@tabler/icons-react";

import styles from "./ProfileManagement.module.scss";
import { useUser } from "../../contexts/UserContext";
import { useState } from "react";

export default function ProfileManagement() {
  const { user } = useUser();
  const [name, setName] = useState<string | undefined>(user?.name || "");
  const [phone, setPhone] = useState<number | null>(user?.phone_number || null);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempProfileName, setTempProfileName] = useState<string>(user!.name);

  const handleConfirmClick = () => {
    console.log("Name is saved! yaddda yadda");
    setIsEditingName(false);
  };

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
                  onChange={(e) => setTempProfileName(e.target.value)}
                  placeholder={"Profile name"}
                  classNames={styles.profileFormField}
                  parentDivClassnames={styles.formFieldParentDiv}
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
                  onClick={() => setIsEditingName(true)}
                />
              </div>
            )}
          </div>
          <form className={styles.form}>
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
              required={true}
            />
            {/* <FormField
              icon={<IconUser size={35} stroke={1.5} className={styles.icon} />}
              type="text"
              placeholder="Profile Link"
              required={true}
            /> */}
            <FormField
              icon={
                <IconPhone size={35} stroke={1.5} className={styles.icon} />
              }
              type="tel"
              placeholder="Phone Number"
              required={true}
              value={phone}
            />
            <FormField
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
            />

            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
            >
              Save
            </Button>
          </form>
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
