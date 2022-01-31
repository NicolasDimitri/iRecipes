import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExibitionComponent from '../components/ExibitionComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
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
      <SearchBar />
      <main>
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
