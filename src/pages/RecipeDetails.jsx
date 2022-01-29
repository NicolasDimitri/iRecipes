import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/RecipeDetails.css';

export default function RecipeDetails() {
  const { id } = useParams();
  const data = useSelector((state) => state.requestReducers.data);
  // console.log(data);
  const filterDetails = data.filter((recipe) => recipe.id === id);
  console.log(filterDetails);
  return (
    <>
      <Header title="Details" />

      <div className="container">
        {
          filterDetails.map((detail, index) => (
            <div key={ index } className="info">
              <img src={ detail.image } alt={ detail.title } />

              <div className="title">
                <h1>{ detail.title }</h1>
              </div>
              <div>
                <p>{ detail.tags }</p>
              </div>

              <div className="ingredients-list">
                <h2>Ingredients</h2>
                <ul>
                  {
                    detail.ingredients.map((ingredient) => (
                      <li key={ ingredient }>{ ingredient }</li>
                    ))
                  }
                </ul>
              </div>

              <div className="intructions">
                <h2>Instructions</h2>
                <p>{ detail.intructions }</p>
              </div>

              <div className="video">
                <h2>Video</h2>
                <iframe
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
              <div className="recommended">
                <div className="card">
                  <img src="" alt="" />
                  <div className="container">
                    <h3>oi</h3>
                    <p>Description</p>
                  </div>
                </div>
              </div>

              <button type="button" className="btn btn-success">Start Recipe</button>

            </div>
          ))
        }
      </div>
    </>
  );
}
