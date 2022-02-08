import React, { useContext } from 'react';
import AplicationContext from '../context/AplicationContext';
import light from '../images/light_mode.svg';
import dark from '../images/night_mode.svg';
import styles from '../styles/change_theme.module.css';

export default function ChangeTheme() {
  const { changeTheme, iconTheme, setIconTheme } = useContext(AplicationContext);

  function toggleTheme() {
    setIconTheme((iconTheme === dark) ? light : dark);
    changeTheme();
  }

  return (
    <section className={ styles.tools_box }>
      <h1> Tema </h1>
      <div className="flex justify_content_around">
        <button
          type="button"
          className={ `${styles.circle} ${styles.color_white}` }
          style={
            iconTheme === dark
              ? { backgroundColor: 'white' }
              : { backgroundColor: 'black' }
          }
          onClick={ () => toggleTheme() }
        >
          <img src={ iconTheme } alt="theme_icon_button" />
        </button>
        <button
          type="button"
          className={ `${styles.circle} ${styles.color_pink}` }
        >
          {' '}
        </button>
      </div>
    </section>
  );
}
