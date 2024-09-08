import React from 'react';
import { CompanyAccountsItemProps } from '../../types/props';
import styles from './CompanyAccountsItem.module.scss';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import TokenFormField from './TokenFormField';
import Status from './Status';

const CompanyAccountsItem: React.FC<CompanyAccountsItemProps> = ({ token, expiration, status }) => {
  return (
    <div className={styles.tokenItem}>
      <p className={styles.token}>{token}</p>
      <Status
        status={status} 
        />
      <p className={styles.expiration}>{expiration}</p>
      <TokenFormField
        classNames={styles.tokenformfield}
        type="text"
        placeholder="Company"
        required={true}
        readOnly={true} // Initially read-only
        editIcon={<IconEdit />} // Icon to make it editable
      />
      <IconTrash className={styles.trashIcon} />
    </div>
  );
};

export default CompanyAccountsItem;
