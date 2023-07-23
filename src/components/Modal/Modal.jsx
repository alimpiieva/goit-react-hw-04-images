import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ imageData, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClose = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleImageClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={styles['modal-overlay']} onClick={handleClose}>
      <div className={styles['modal-content']}>
        <img
          src={imageData.largeImageURL}
          alt=""
           onClick={handleImageClick}
         />
       </div>
     </div>
   );
 }


Modal.propTypes = {
  imageData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func,
};

export default Modal;