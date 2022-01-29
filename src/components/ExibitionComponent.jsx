import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ExibitionComponent({
  exibitionData: { title, image, id },
  index,
}) {
  return (
    <Link to={ `/foods/${id}` }>
      <section
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ image }
          alt=""
        />
        <h1
          data-testid={ `${index}-card-name` }
        >
          {title}
        </h1>

      </section>
    </Link>
  );
}

ExibitionComponent.propTypes = {
  exibitionData: propTypes.objectOf(propTypes.any).isRequired,
  index: propTypes.number.isRequired,
};
