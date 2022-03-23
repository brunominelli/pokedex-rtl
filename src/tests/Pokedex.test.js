import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  const buttonText = 'Próximo pokémon';
  it('1- Se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const encounteredPokemons = screen
      .getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(encounteredPokemons).toBeInTheDocument();
  });

  it('2- Se é exibido o próximo Pokémon quando "Próximo pokémon" é clicado.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe('Pikachu');

    const nextPokemon = screen.getByRole('button', { name: buttonText });
    userEvent.click(nextPokemon);
    expect(pokemonName.innerHTML).toBe('Charmander');

    userEvent.click(nextPokemon);
    expect(pokemonName.innerHTML).toBe('Caterpie');
  });

  it('3- Se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');

    const nextPokemon = screen.getByRole('button', { name: buttonText });
    userEvent.click(nextPokemon);
    expect(pokemonWeight.innerHTML).toBe('Average weight: 8.5 kg');

    userEvent.click(nextPokemon);
    expect(pokemonWeight.innerHTML).toBe('Average weight: 2.9 kg');
  });

  it('4- Se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    filterButtons.forEach((button) => expect(button).toBeInTheDocument());

    const pokemonType = screen.getByTestId('pokemon-type');
    userEvent.click(filterButtons[1]);

    const isType = pokemonType.innerHTML === filterButtons[1].innerHTML;
    expect(isType).toBe(true);

    const nextPokemon = screen.getByRole('button', { name: buttonText });
    userEvent.click(nextPokemon);
    expect(pokemonType.innerHTML).toBe('Fire');
  });

  it('5- Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetFilter = screen.getByRole('button', { name: 'All' });
    userEvent.click(resetFilter);
    expect(resetFilter).toBeInTheDocument();
  });
});
