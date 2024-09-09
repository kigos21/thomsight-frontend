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
} from "@tabler/icons-react";

import styles from "./ProfileManagement.module.scss";

export default function ProfileManagement() {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <StyledBox classNames={styles.styledBox}>
        <div className={styles.container}>
          <h2>User Profile</h2>
          <IconUser size={100} stroke={2} className={styles.headerIcon} />
          <div className={styles.nameContainer}>
            <p className={styles.name}>Yung name ni user na editable</p>
            <IconEdit size={35} stroke={1.5} className={styles.nameEditIcon} />
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
              editIcon={
                <IconEdit size={35} stroke={1.5} className={styles.editIcon} />
              }
            />
            <FormField
              icon={<IconUser size={35} stroke={1.5} className={styles.icon} />}
              type="text"
              placeholder="Profile Link"
              required={true}
              editIcon={
                <IconEdit size={35} stroke={1.5} className={styles.editIcon} />
              }
            />
            <FormField
              icon={
                <IconPhone size={35} stroke={1.5} className={styles.icon} />
              }
              type="tel"
              placeholder="Phone Number"
              required={true}
              editIcon={
                <IconEdit size={35} stroke={1.5} className={styles.editIcon} />
              }
            />
            <FormField
              icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
              type="password"
              placeholder="Your Password"
              required={true}
              editIcon={
                <IconEdit size={35} stroke={1.5} className={styles.editIcon} />
              }
            />
            <FormField
              icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
              type="password"
              placeholder="Your New Password"
              required={true}
              editIcon={
                <IconEdit size={35} stroke={1.5} className={styles.editIcon} />
              }
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
