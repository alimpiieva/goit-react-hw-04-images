import React, { useState, useEffect } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import Modal from '../Modal/Modal';
import fetchImages from '../Api/Api';
import LoaderComponent from 'components/Loader/Loader';
import Button from 'components/Button/Button';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noImagesFound, setNoImagesFound] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    if (!searchPerformed) return;

    setIsLoading(true);

    fetchImages(searchQuery, page)
      .then((formattedImages) => {
        setImages((prevImages) => [...prevImages, ...formattedImages]);
        setIsLoading(false);
        setNoImagesFound(formattedImages.length === 0);
        setHasMoreImages(formattedImages.length === 12);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setIsLoading(false);
      });
  }, [searchPerformed, searchQuery, page]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setSearchPerformed(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      {searchPerformed && <ImageGallery images={images} onImageClick={openModal} />}
      {showModal && <Modal imageData={selectedImage} onClose={closeModal} />}

      {isLoading && <LoaderComponent />}
      {noImagesFound && <p>No images found.</p>}
      {hasMoreImages && !isLoading && <Button onClick={handleLoadMore}>Load More</Button>}
    </div>
  );
};

export default App;
