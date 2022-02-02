import propTypes from 'prop-types';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import like from '../images/postLikeIcon.svg';
import share from '../images/postShareIcon.svg';
import styles from '../styles/Exibition.module.css';

export default function ExibitionComponent({
  exibitionData: { title, image, id, tags, category, location },
  index,
}) {
  const { path } = useRouteMatch();

  const addEntry = () => {
    const obj = {
      id,
      title,
      image,
      tags,
      category,
      location,
      path,
    };
    let existingFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (existingFavorites === null) existingFavorites = [];
    console.log(obj);
    const newEntry = JSON.stringify(existingFavorites.concat(obj));
    localStorage.setItem('favorites', newEntry);
  };

  const copToClipboard = () => {
    const copyText = `http://localhost:3000/${path.replace('/', '')}/${id}`;
    navigator.clipboard.writeText(copyText);
    alert('Link copied!');
  };

  return (
    <section className={ `wrapper primary_color ${styles.box}` }>
      <h1 data-testid={ `${index}-card-name` }>
        {title}
      </h1>
      <Link
        to={ `/${path.replace('/', '')}/${id}` }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          className={ styles.hero }
          data-testid={ `${index}-card-img` }
          src={ image }
          alt=""
        />
      </Link>
      <section className={ `flex justify_content_around ${styles.feedback}` }>
        <div onClick={ addEntry } onKeyPress={ addEntry } role="button" tabIndex="0">
          <img src={ like } alt="a" />
        </div>
        <div
          onClick={ copToClipboard }
          onKeyPress={ copToClipboard }
          role="button"
          tabIndex="0"
        >
          <img src={ share } alt="b" />
        </div>
      </section>
    </section>
  );
}

ExibitionComponent.propTypes = {
  exibitionData: propTypes.objectOf(propTypes.any).isRequired,
  index: propTypes.number.isRequired,
};
