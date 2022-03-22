import React from 'react';
import { renderWithRouter } from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('1- Se é exibido na tela a mensagem No favorite pokemon found.', () => {
    renderWithRouter(<FavoritePokemons />);
  });

  it('2- Se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons />);
  });
});
