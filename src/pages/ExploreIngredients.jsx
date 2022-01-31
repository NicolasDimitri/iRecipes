import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function ExploreIngredients() {
  return (
    <>
      <Header title="Explore Ingredients" renderExplore={ false } />
      <SearchBar />
      <Footer />
    </>
  );
}
