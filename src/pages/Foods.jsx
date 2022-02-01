import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
      <main style={ { margin: '90px 0' } } className="flex flex_direction_column">
        {
          data.length > 0 && (
            data.map((item, index) => {
              if ((index + 1) <= MAXIMUM_RECIPES_CARD) {
                return (
                  <ExibitionComponent
                    key={ item.title }
                    exibitionData={ item }
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
