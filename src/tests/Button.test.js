import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';
import Button from '../components/Button';

describe('Testando o componente Button', () => {
  beforeEach(() => {
    renderWithRouteReduxAndContext(<Button dataTestid="btn-test" value="Teste" />);
  });
  it('Verifica se o botao e renderizado com o texto correto', () => {
    expect(screen.getByTestId('btn-test')).toBeInTheDocument();
    expect(screen.getByTestId('btn-test')).toHaveTextContent('Teste');
    expect(screen.getByTestId('btn-test')).toHaveAttribute('data-testid', 'btn-test');
  });
});
