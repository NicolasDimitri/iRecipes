import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function Drinks() {
  return (
    <>
      <Header title="Explore Drinks" />
      <SearchBar />
      <Footer />
    </>
  );
}
