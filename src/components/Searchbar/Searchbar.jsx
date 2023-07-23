import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css'

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      return;
    }
    onSubmit(query);
    setQuery('')
  };
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
    
  return (
    <header className={styles.SearchForm}>
      <div className={styles['SearchbarContainer']}>
        <form className={styles['SearchFormForm']} onSubmit={handleSubmit}>
          <button type="submit" className={styles['SearchFormButton']}>
            <span>🔍</span>
          </button>
          <input
            className={styles['SearchFormInput']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </form>
      </div>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
