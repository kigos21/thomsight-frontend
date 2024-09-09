import React from 'react';
import { TokenItemProps } from '../../types/props';
import styles from './TokenItem.module.scss';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import TokenFormField from './TokenFormField';

const TokenItem: React.FC<TokenItemProps> = ({ number, token }) => {
  return (
    <div className={styles.tokenItem}>
      <span className={styles.number}>{number}</span>
      <span className={styles.token}>{token}</span>
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

export default TokenItem;
