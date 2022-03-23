import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const details = 'More details';
  it('1- Se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: details });
    userEvent.click(moreDetails);

    const pokemonDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(pokemonDetails).toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summary).toBeInTheDocument();

    const paragraph = screen.getByText(/This intelligent Pokémon/);
    expect(paragraph).toBeInTheDocument();
  });

  it('2- Se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: details });
    userEvent.click(moreDetails);

    const gameLocations = screen
      .getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(gameLocations).toBeInTheDocument();

    const map = screen.getAllByAltText('Pikachu location');
    expect(map[0].src).toContain('bulbagarden');
    expect(map[0].alt).toContain('Pikachu');
  });

  it('3- Se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: details });
    userEvent.click(moreDetails);
    const label = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(label);
    const image = screen.getByAltText(/is marked as favorite/);
    expect(image.src).toContain('star-icon');
  });
});
