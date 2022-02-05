import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';
import Header from '../components/Header';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve('Resolveu'),
}));

global.alert = jest.fn(() => 'ola');

const SEARCH_BTN = 'search-btn';
const SEARCH_INPUT = 'search-input';
const INPUT_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';
const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
const FIRST_LETTER_INPUT_RADIO = 'first-letter-search-radio';
describe('Testando o componente SearchBar (Foods)', () => {
  beforeEach(() => {
    fetch.mockClear();
    const initialEntries = ['/foods'];
    const route = '/foods';
    renderWithRouteReduxAndContext(
      <Header title="testando" renderExplore />,
      { initialEntries, route },
    );
  });
  it('Testando se ao pesquisar por nome o endpoint correto e chamado', async () => {
    userEvent.click(screen.getByTestId(SEARCH_BTN));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'soup');
    expect(screen.getByTestId(SEARCH_INPUT)).toHaveValue('soup');
    userEvent.click(screen.getByTestId(INPUT_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Testando se ao pesquisar por firstLetter o endpoint correto e chamado',
    async () => {
      userEvent.click(screen.getByTestId(SEARCH_BTN));
      userEvent.type(screen.getByTestId(SEARCH_INPUT), 'a');
      expect(screen.getByTestId(SEARCH_INPUT)).toHaveValue('a');
      userEvent.click(screen.getByTestId(FIRST_LETTER_INPUT_RADIO));
      userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  it('Testando se exibe um alerte caso o numero de letras e diferente de 1', () => {
    userEvent.click(screen.getByTestId(SEARCH_BTN));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'aaa');
    expect(screen.getByTestId(SEARCH_INPUT)).toHaveValue('aaa');
    userEvent.click(screen.getByTestId(FIRST_LETTER_INPUT_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    expect(fetch).not.toHaveBeenCalled();
  });
  it('Testando se ao pesquisar por Ingredient o endpoint correto e chamado', async () => {
    userEvent.click(screen.getByTestId(SEARCH_BTN));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Avocado');
    expect(screen.getByTestId(SEARCH_INPUT)).toHaveValue('Avocado');
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Avocado');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it(('Testa o parametro default do Switch (Foods)'), () => {
    userEvent.click(screen.getByTestId(SEARCH_BTN));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'bbb');
    expect(screen.getByTestId(SEARCH_INPUT)).toHaveValue('bbb');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});

describe('Testando o componente SearchBar (Drinks)', () => {
  beforeEach(() => {
    fetch.mockClear();
    const initialEntries = ['/drinks'];
    const route = '/drinks';
    renderWithRouteReduxAndContext(
      <Header title="testando" renderExplore />,
      { initialEntries, route },
    );
  });
  afterEach(() => cleanup());
  it('Testando se ao pesquisar por nome o endpoint correto e chamado (Drinks)',
    async () => {
      userEvent.click(screen.getByTestId(SEARCH_BTN));
      userEvent.type(screen.getByTestId(SEARCH_INPUT), 'GG');
      expect(screen.getByTestId(SEARCH_INPUT)).toHaveValue('GG');
      userEvent.click(screen.getByTestId(INPUT_SEARCH_RADIO));
      userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=GG');
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  it('Testando se ao pesquisar por firstLetter o endpoint correto e chamado (Drinks)',
    async () => {
      userEvent.click(screen.getByTestId(SEARCH_BTN));
      userEvent.type(screen.getByTestId(SEARCH_INPUT), 'a');
      expect(screen.getByTestId(SEARCH_INPUT)).toHaveValue('a');
      userEvent.click(screen.getByTestId(FIRST_LETTER_INPUT_RADIO));
      userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
      expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
      expect(fetch).toHaveBeenCalledTimes(1);
    });

  it('Testando se exibe um alerte caso o numero de letras e diferente de 1 (Drinks)',
    () => {
      userEvent.click(screen.getByTestId(SEARCH_BTN));
      userEvent.click(screen.getByTestId(FIRST_LETTER_INPUT_RADIO));
      userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
      expect(alert).toHaveBeenCalledTimes(1);
      expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
      expect(fetch).not.toHaveBeenCalled();
    });

  it('Testando se ao pesquisar por Ingredient o endpoint correto e chamado', async () => {
    userEvent.click(screen.getByTestId(SEARCH_BTN));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'Vodka');
    expect(screen.getByTestId(SEARCH_INPUT)).toHaveValue('Vodka');
    userEvent.click(screen.getByTestId(INGREDIENT_SEARCH_RADIO));
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it(('Testa o parametro default do Switch (Drinks)'), () => {
    userEvent.click(screen.getByTestId(SEARCH_BTN));
    userEvent.type(screen.getByTestId(SEARCH_INPUT), 'aaa');
    expect(screen.getByTestId(SEARCH_INPUT)).toHaveValue('aaa');
    userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN));
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
});
