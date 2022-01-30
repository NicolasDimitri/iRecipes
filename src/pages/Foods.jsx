import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExibitionComponent from '../components/ExibitionComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';
import requestFoodsToAPI from '../redux/actions';

export default function Foods() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestFoodsToAPI());
  }, [dispatch]);

  const data = useSelector((state) => state.requestReducers.data);
  return (
    <>
      <Header title="Foods" />
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
