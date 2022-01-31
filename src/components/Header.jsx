import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AplicationContext from '../context/AplicationContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { requestDrinksFromAPI, requestFoodsToAPI } from '../redux/actions';
import styles from '../styles/Header.module.css';
import SearchBar from './SearchBar';

function Header({ title, renderExplore }) {
  const { toggleSearchBar } = useContext(AplicationContext);
  const isReload = useSelector((state) => state.requestReducers.foods);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isReload.length <= 0) {
      dispatch(requestFoodsToAPI());
      dispatch(requestDrinksFromAPI());
    }
  }, [dispatch, isReload.length]);
  return (
    <header className={ `box primary_color ${styles.box}` }>
      <div className="wrapper flex justify_content_between relative">
        <nav>
          <Link to="/profile" className={ styles.button }>
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              width="90%"
              alt=""
            />
          </Link>
        </nav>
        <h1 data-testid="page-title" className={ styles.title }>{ title }</h1>
        {
          renderExplore && (
            <button type="button" className={ styles.button } onClick={ toggleSearchBar }>
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                width="90%"
                alt="search"
              />
            </button>
          )
        }
      </div>
      <SearchBar />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  renderExplore: PropTypes.bool,
};

Header.defaultProps = {
  renderExplore: true,
};

export default Header;
