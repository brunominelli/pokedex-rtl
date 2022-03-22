import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  const details = 'More details';
  it('1- Se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonSprite = screen.getByAltText(/sprite/);

    expect(pokemonName.innerHTML).toContain('Pikachu');
    expect(pokemonType.innerHTML).toContain('Electric');
    expect(pokemonWeight.innerHTML).toContain('Average weight: 6.0 kg');
    expect(pokemonSprite.src).toContain('bulbagarden');
  });

  it('2- Se o card do Pokémon contém um link para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: details });
    expect(pokemonDetails.href).toContain('http://localhost/pokemons/25');
  });

  it('3- Se ao clicar no link redireciona à página de detalhes de Pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: details });
    userEvent.click(pokemonDetails);
    const image = screen.getByAltText(/sprite/);
    expect(image.src).toContain('bulbagarden');
  });

  it('4- Se a URL exibida no navegador muda para /pokemon/<id>.', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: details });
    userEvent.click(pokemonDetails);
    expect(pokemonDetails.href).toContain('/pokemons/');
  });

  it('5- Se página mostra a imagem.', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: details });
    userEvent.click(pokemonDetails);
    const label = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(label);
    const image = screen.getByAltText(/is marked as favorite/);
    expect(image.src).toContain('star-icon');
  });
});
