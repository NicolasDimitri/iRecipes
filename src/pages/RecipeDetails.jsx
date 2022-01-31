import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipeDetails() {
  const { id } = useParams();
  const data = useSelector((state) => state.requestReducers.data);
  const filterDetails = data.filter((recipe) => recipe.id === id);
  return (
    <>
      <Header title="Details" />
      <div className="container">
        {
          filterDetails.map((detail, index) => (
            <div key={ index } className="info">
              <img data-testid="recipe-photo" src={ detail.image } alt={ detail.title } />

              <div className="title">
                <h1 data-testid="recipe-title">{ detail.title }</h1>

                <div>
                  <button type="button" className="btn" data-testid="share-btn">
                    <img src={ shareIcon } alt="share icon" />
                  </button>
                  <button type="button" className="btn" data-testid="favorite-btn">
                    <img src={ blackHeartIcon } alt="black heart icon" />
                  </button>
                </div>
              </div>
              <div>
                <p data-testid="recipe-category">{ detail.tags }</p>
              </div>

              <div className="ingredients-list">
                <h2>Ingredients</h2>
                <ul>
                  {
                    detail.ingredients.map((ingredient) => (
                      <li
                        key={ ingredient }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      >
                        { ingredient }
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div className="intructions">
                <h2>Instructions</h2>
                <p data-testid="instructions">{ detail.intructions }</p>
              </div>

              <div className="video">
                <h2>Video</h2>
                <iframe
                  data-testid="video"
                  width="853"
                  height="480"
                  src={ detail.movie }
                  frameBorder="0"
                  // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>

              <h2>Recommended</h2>
              <div className="recommended" data-testid={ `${index}-recomendation-card` }>
                <div className="card">
                  <img src="" alt="" />
                  <div className="container">
                    <h3>oi</h3>
                    <p>Description</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btn btn-success"
              >
                Start Recipe
              </button>

            </div>
          ))
        }
      </div>
      <Footer />
    </>
  );
}
