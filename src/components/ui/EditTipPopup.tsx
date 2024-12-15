import React, { useState } from 'react';
import styles from './EditTipPopup.module.scss'; // Create this file for styles
import Button from './Button';

interface EditTipPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}

const EditTipPopup: React.FC<EditTipPopupProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSave(title, description);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>Edit Interview Tip</h2>
        <div className={styles.separator}></div>
        <div className={styles.formContainer}>
          <label className={styles.label}>Tip Details</label>
          <textarea
            className={styles.textarea}
            placeholder="Input interview tips"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className={styles.label}>Video Link</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Input link"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button classNames={styles.cancelButton} onClick={onClose}>
            Cancel
          </Button>
          <Button classNames={styles.submitButton} onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditTipPopup; 