import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AplicationContext from '../context/AplicationContext';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const { theme } = useContext(AplicationContext);
  function applyStyle() {
    if (theme === 'light_mode') {
      return { filter: 'invert(100%)' };
    }
  }
  return (
    <footer
      className={ `primary_color box ${styles.box}` }
      data-testid="footer"
    >
      <nav className="wrapper flex justify_content_between ">
        <Link to="/drinks" className={ styles.button }>
          <img
            style={ applyStyle() }
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            width="70%"
            alt=""
          />
        </Link>
        <Link to="/explore" className={ styles.button }>
          <img
            style={ applyStyle() }
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            width="70%"
            alt=""
          />
        </Link>
        <Link to="/foods" className={ styles.button }>
          <img
            style={ applyStyle() }
            data-testid="food-bottom-btn"
            src={ mealIcon }
            width="70%"
            alt=""
          />
        </Link>
      </nav>
    </footer>
  );
}
