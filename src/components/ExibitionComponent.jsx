import propTypes from 'prop-types';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import like from '../images/postLikeIcon.svg';
import share from '../images/postShareIcon.svg';
import styles from '../styles/Exibition.module.css';

export default function ExibitionComponent({
  exibitionData: { title, image, id },
  index,
}) {
  const { path } = useRouteMatch();
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
        <img src={ like } alt="a" />
        <img src={ share } alt="b" />
      </section>
    </section>
  );
}

ExibitionComponent.propTypes = {
  exibitionData: propTypes.objectOf(propTypes.any).isRequired,
  index: propTypes.number.isRequired,
};
