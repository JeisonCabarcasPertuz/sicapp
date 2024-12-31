import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  isSuccess: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, isSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={`${styles.modalTitle} ${isSuccess ? styles.success : styles.error}`}>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;

