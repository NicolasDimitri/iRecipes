import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExibitionComponent from '../components/ExibitionComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AplicationContext from '../context/AplicationContext';
import { requestFoodsToAPI } from '../redux/actions';

export default function Foods() {
  const MAXIMUM_RECIPES_CARD = 12;

  const { selectedIngredient } = useContext(AplicationContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedIngredient) {
      dispatch(requestFoodsToAPI());
    }
  }, [selectedIngredient, dispatch]);

  const data = useSelector((state) => state.requestReducers.foods);

  return (
    <>
      <Header title="Foods" />

      <main>
        <h1 style={ { display: 'none' } }>Foods page</h1>
        {
          data.length > 0 && (
            data.map((item, index) => {
              if ((index + 1) <= MAXIMUM_RECIPES_CARD) {
                return (
                  <ExibitionComponent
                    key={ item.title }
                    data={ item }
                    index={ index }
                  />
                );
              }
              return false;
            })
          )
        }
      </main>
      <Footer />
    </>
  );
}
