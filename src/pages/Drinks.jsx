import React from 'react';
import { useSelector } from 'react-redux';
import ExibitionComponent from '../components/ExibitionComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Drinks() {
  const data = useSelector((state) => state.requestReducers.drinks);

  return (
    <>
      <Header title="Drinks" />
      <main style={ { margin: '90px 0' } } className="flex flex_direction_column">
        {
          data.length > 0 && (
            data.map((item, index) => (
              <ExibitionComponent
                key={ item.title }
                exibitionData={ item }
                index={ index }
              />
            ))
          )
        }
      </main>
      <Footer />
    </>
  );
}
