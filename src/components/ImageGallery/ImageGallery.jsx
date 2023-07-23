import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  const handleImageClick = (image) => {
    onImageClick(image);
  };

    return (
      <div>
        <ul className={styles.gallery}>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              imageData={image}
              alt={image.tags}
              onClick={handleImageClick}
            />
          ))}
        </ul>
      </div>
    );
};

  ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
      })
    ).isRequired,
    onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
