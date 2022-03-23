import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('1- Se é exibido na tela a mensagem No favorite pokemon found.', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePokemons).toBeInTheDocument();

    userEvent.click(favoritePokemons);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  it('2- Se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const labelFavoritePokemons = screen.getByText('Pokémon favoritado?');
    expect(labelFavoritePokemons).toBeInTheDocument();
    userEvent.click(labelFavoritePokemons);

    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePokemons).toBeInTheDocument();
    userEvent.click(favoritePokemons);

    const pokemonName = screen.getAllByTestId('pokemon-name');
    pokemonName.forEach((pokemon) => expect(pokemon).toBeInTheDocument());
  });
});
