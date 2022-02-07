import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import { getUserEmailFromLocalStorage, removeLocalStorageKeys } from '../helpers';
import keysToRemoveWhenLogout from '../data';
import Footer from '../components/Footer';

export default function Profile() {
  const history = useHistory();

  const logOffUser = () => {
    removeLocalStorageKeys(keysToRemoveWhenLogout);
    history.push('/');
  };
  return (
    <>
      <Header title="Profile" renderExplore={ false } />
      <main style={ { marginTop: '90px' } }>
        <p data-testid="profile-email">
          {getUserEmailFromLocalStorage()}
        </p>

        <section className="profile-btns-container">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>

          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>

          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ logOffUser }
          >
            Logout
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
