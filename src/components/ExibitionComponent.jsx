import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import AplicationContext from '../context/AplicationContext';
import styles from '../styles/Exibition.module.css';
import Feed from './Feed';

export default function ExibitionComponent({ data, index }) {
  const { title, image, id } = data;
  const { path } = useRouteMatch();

  const { resetSearchInput } = useContext(AplicationContext);

  return (
    <article className={ `primary_color ${styles.box}` }>
      <h1 data-testid={ `${index}-card-name` }>
        {title}
      </h1>
      <Link
        to={ `/${path.replace('/', '')}/${id}` }
        data-testid={ `${index}-recipe-card` }
        onClick={ resetSearchInput }
      >
        <img
          className={ styles.hero }
          data-testid={ `${index}-card-img` }
          src={ image }
          alt=""
        />
      </Link>
      <Feed
        styles={ styles }
        item={ data }
      />
    </article>
  );
}

ExibitionComponent.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
